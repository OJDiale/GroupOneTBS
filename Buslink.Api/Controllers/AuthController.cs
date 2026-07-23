using Buslink.Api.Data;
using Buslink.Api.DTOs.Auth;
using Buslink.Api.Models;
using Buslink.Api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace Buslink.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private static readonly TimeSpan OtpValidity = TimeSpan.FromMinutes(2);
    private static readonly TimeSpan ResetTokenValidity = TimeSpan.FromMinutes(10);
    private const int MaxOtpAttempts = 5;
    private readonly ApplicationDbContext _context;
    private readonly IPasswordHasher<Passenger> _passwordHasher;

    private readonly JwtService _jwtService;
    private readonly IOtpService _otpService;
    private readonly INotificationService _notificationService;
    private readonly ILogger<AuthController> _logger;

    private string GenerateCardNumber()
    {
        var random = new Random();

        return $"BC{DateTime.Now:yyyy}{random.Next(100000, 999999)}";
    }

    public AuthController(
    ApplicationDbContext context,
    IPasswordHasher<Passenger> passwordHasher,
    JwtService jwtService,
    IOtpService otpService,
    INotificationService notificationService,
    ILogger<AuthController> logger)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _jwtService = jwtService;
        _otpService = otpService;
        _notificationService = notificationService;
        _logger = logger;
    }

    //ADD THE REGISTER METHOD 

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterPassengerDto dto)
    {

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        bool emailExists = await _context.Passengers
            .AnyAsync(x => x.Email == dto.Email);

        if (emailExists)
        {
            return BadRequest(new
            {
                message = "Email is already registered."
            });
        }
        bool idExists = await _context.Passengers
              .AnyAsync(x => x.IdNumber == dto.IdNumber);

        if (idExists)
        {
            return BadRequest(new
            {
                message = "South African ID Number already exists."
            });
        }

        var passenger = new Passenger
        {
            IdNumber = dto.IdNumber,
            Name = dto.Name,
            Surname = dto.Surname,
            Email = dto.Email,
            PhoneNumber = dto.PhoneNumber,
            PasswordHash = string.Empty
        };
        passenger.PasswordHash =
            _passwordHasher.HashPassword(passenger, dto.Password);

        _context.Passengers.Add(passenger);
        await _context.SaveChangesAsync(); // Save first so passenger.UserId gets auto-generated before we use it below

        var busCard = new Cards
        {
            PassengerId = passenger.UserId,
            CardNumber = GenerateCardNumber(),
            Balance = 0.00m,
            Status = "Active"
        };

        _context.Cards.Add(busCard);

        var wallet = new Wallet
        {
            PassengerId = passenger.UserId,
            Balance = 0.00m
        };

        _context.Wallets.Add(wallet);

        await _context.SaveChangesAsync();

        var otp = _otpService.GenerateOtp();

passenger.OtpCodeHash = _otpService.Hash(otp);
passenger.OtpExpiresAt = DateTime.UtcNow.Add(OtpValidity);
passenger.OtpPurpose = "EmailVerification";
passenger.OtpAttempts = 0;

await _context.SaveChangesAsync();

try
{
    await _notificationService.SendOtpEmailAsync(
        passenger.Email,
        passenger.Name,
        otp);
}
catch (Exception ex)
{
    _logger.LogError(ex, "Failed to send registration OTP email to {Email}", passenger.Email);

    return StatusCode(502, new
    {
        message = "Registration was created, but we could not send the verification email. Please request a new code."
    });
}

        return Ok(new
{
    message = "Passenger registered successfully. A verification code has been sent to your email.",
    requiresEmailVerification = true
});
    }

    // 👇 ADD THE LOGIN METHOD HERE

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginPassengerDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var passenger = await _context.Passengers
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (passenger == null)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        var result = _passwordHasher.VerifyHashedPassword(
            passenger,
            passenger.PasswordHash,
            dto.Password);

        if (result == PasswordVerificationResult.Failed)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        string token = _jwtService.GenerateToken(passenger);

       var response = new LoginResponseDto
        {
            Token = token,
            UserId = passenger.UserId.ToString(), // Convert int to string to match LoginResponseDto's expected type
            Name = passenger.Name,
            Email = passenger.Email
        };

        return Ok(response);
    }
    // 👇 ADD AUTHORIZE METHOD HERE
    [Authorize]
    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized();
        }

        // userId comes from the token as a string; convert it to int to match Passenger.UserId
        int parsedUserId = int.Parse(userId);

        var passenger = await _context.Passengers
            .FirstOrDefaultAsync(x => x.UserId == parsedUserId);

        if (passenger == null)
        {
            return NotFound(new
            {
                message = "Passenger not found."
            });
        }

        return Ok(new
        {
            passenger.UserId,
            passenger.Name,
            passenger.Surname,
            passenger.Email,
            passenger.PhoneNumber,
            passenger.CreatedAt
        });
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordRequestDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var passenger = await _context.Passengers
            .FirstOrDefaultAsync(p => p.IdNumber == dto.IdNumber);

        if (passenger is not null)
        {
            var otp = _otpService.GenerateOtp();

            try
            {
                await _notificationService.SendOtpEmailAsync(passenger.Email, passenger.Name, otp);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send password-reset OTP email to {Email}", passenger.Email);
                return StatusCode(502, new { message = "We couldn't send the verification email right now. Please try again shortly." });
            }

            passenger.OtpCodeHash = _otpService.Hash(otp);
            passenger.OtpExpiresAt = DateTime.UtcNow.Add(OtpValidity);
            passenger.OtpPurpose = "PasswordReset";
            passenger.OtpAttempts = 0;
            passenger.PasswordResetTokenHash = null;
            passenger.PasswordResetTokenExpiresAt = null;

            await _context.SaveChangesAsync();
        }

        return Ok(new { message = "If that ID number is registered, a verification code has been sent to the associated email address." });
    }

    [HttpPost("verify-reset-otp")]
    public async Task<IActionResult> VerifyResetOtp(VerifyResetOtpDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var passenger = await _context.Passengers
            .FirstOrDefaultAsync(p => p.IdNumber == dto.IdNumber);

        if (passenger is null || passenger.OtpPurpose != "PasswordReset" || passenger.OtpCodeHash is null || passenger.OtpExpiresAt is null)
            return BadRequest(new { message = "Invalid or expired code. Please request a new one." });

        if (passenger.OtpExpiresAt < DateTime.UtcNow)
            return BadRequest(new { message = "This code has expired. Please request a new one." });

        if (passenger.OtpAttempts >= MaxOtpAttempts)
            return BadRequest(new { message = "Too many incorrect attempts. Please request a new code." });

        if (_otpService.Hash(dto.Otp) != passenger.OtpCodeHash)
        {
            passenger.OtpAttempts += 1;
            await _context.SaveChangesAsync();
            return BadRequest(new { message = "Incorrect code." });
        }

        var resetToken = _otpService.GenerateResetToken();
        passenger.PasswordResetTokenHash = _otpService.Hash(resetToken);
        passenger.PasswordResetTokenExpiresAt = DateTime.UtcNow.Add(ResetTokenValidity);
        passenger.OtpCodeHash = null;
        passenger.OtpExpiresAt = null;
        passenger.OtpPurpose = null;
        passenger.OtpAttempts = 0;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Code verified.", resetToken });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var passenger = await _context.Passengers
            .FirstOrDefaultAsync(p => p.IdNumber == dto.IdNumber);

        if (passenger is null || passenger.PasswordResetTokenHash is null || passenger.PasswordResetTokenExpiresAt is null)
            return BadRequest(new { message = "Invalid or expired reset request. Please start again." });

        if (passenger.PasswordResetTokenExpiresAt < DateTime.UtcNow)
            return BadRequest(new { message = "This reset session has expired. Please start again." });

        if (_otpService.Hash(dto.ResetToken) != passenger.PasswordResetTokenHash)
            return BadRequest(new { message = "Invalid reset token." });

        passenger.PasswordHash = _passwordHasher.HashPassword(passenger, dto.NewPassword);
        passenger.PasswordResetTokenHash = null;
        passenger.PasswordResetTokenExpiresAt = null;

        await _context.SaveChangesAsync();
        return Ok(new { message = "Password reset successful. You can now log in with your new password." });
    }

    [HttpPost("verify-registration-otp")]
public async Task<IActionResult> VerifyRegistrationOtp(VerifyRegistrationOtpDto dto)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState);

    var passenger = await _context.Passengers
        .FirstOrDefaultAsync(p => p.Email == dto.Email);

    if (passenger is null
        || passenger.OtpPurpose != "EmailVerification"
        || passenger.OtpCodeHash is null
        || passenger.OtpExpiresAt is null)
    {
        return BadRequest(new
        {
            message = "Invalid or expired code. Please request a new one."
        });
    }

    if (passenger.OtpExpiresAt < DateTime.UtcNow)
        return BadRequest(new { message = "This code has expired. Please request a new one." });

    if (passenger.OtpAttempts >= MaxOtpAttempts)
        return BadRequest(new { message = "Too many incorrect attempts. Please request a new code." });

    if (_otpService.Hash(dto.Otp) != passenger.OtpCodeHash)
    {
        passenger.OtpAttempts += 1;
        await _context.SaveChangesAsync();

        return BadRequest(new { message = "Incorrect OTP code." });
    }

    passenger.IsVerified = true;
    passenger.OtpCodeHash = null;
    passenger.OtpExpiresAt = null;
    passenger.OtpPurpose = null;
    passenger.OtpAttempts = 0;

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Email verified successfully."
    });
}

[HttpPost("resend-registration-otp")]
public async Task<IActionResult> ResendRegistrationOtp(ResendRegistrationOtpDto dto)
{
    var passenger = await _context.Passengers
        .FirstOrDefaultAsync(p => p.Email == dto.Email);

    if (passenger is null)
        return NotFound(new { message = "Passenger not found." });

    var otp = _otpService.GenerateOtp();

    passenger.OtpCodeHash = _otpService.Hash(otp);
    passenger.OtpExpiresAt = DateTime.UtcNow.Add(OtpValidity);
    passenger.OtpPurpose = "EmailVerification";
    passenger.OtpAttempts = 0;

    await _context.SaveChangesAsync();

    await _notificationService.SendOtpEmailAsync(
        passenger.Email,
        passenger.Name,
        otp);

    return Ok(new
    {
        message = "A new verification code has been sent to your email."
    });
}

}
