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
    private readonly ApplicationDbContext _context;
    private readonly IPasswordHasher<Passenger> _passwordHasher;

    private readonly JwtService _jwtService;

    private string GenerateCardNumber()
    {
        var random = new Random();

        return $"BC{DateTime.Now:yyyy}{random.Next(100000, 999999)}";
    }

    public AuthController(
    ApplicationDbContext context,
    IPasswordHasher<Passenger> passwordHasher,
    JwtService jwtService)
    {
        _context = context;
        _passwordHasher = passwordHasher;
        _jwtService = jwtService;
    }

    // 👇 ADD THE REGISTER METHOD 

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
              .AnyAsync(x => x.UserId == dto.UserId);

        if (idExists)
        {
            return BadRequest(new
            {
                message = "South African ID Number already exists."
            });
        }

        var passenger = new Passenger
        {
            UserId = dto.UserId,
            Name = dto.Name,
            Surname = dto.Surname,
            Email = dto.Email,
            PhoneNumber = dto.PhoneNumber,
            PasswordHash = string.Empty
        };
        passenger.PasswordHash =
            _passwordHasher.HashPassword(passenger, dto.Password);

        _context.Passengers.Add(passenger);

        var busCard = new Cards
        {
            PassengerId = passenger.UserId,
            CardNumber = GenerateCardNumber(),
            Balance = 0.00m,
            Status = "Active"
        };



        _context.Cards.Add(busCard);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Passenger registered successfully."
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
            UserId = passenger.UserId,
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

        var passenger = await _context.Passengers
            .FirstOrDefaultAsync(x => x.UserId == userId);

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

}