using System.ComponentModel.DataAnnotations;

namespace Buslink.Api.DTOs.Auth;

public class ForgotPasswordRequestDto
{
    [Required]
    [RegularExpression(@"^\d{13}$", ErrorMessage = "South African ID Number must be exactly 13 digits.")]
    public string IdNumber { get; set; } = string.Empty;
}

public class VerifyResetOtpDto
{
    [Required]
    [RegularExpression(@"^\d{13}$", ErrorMessage = "South African ID Number must be exactly 13 digits.")]
    public string IdNumber { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^\d{6}$", ErrorMessage = "OTP must be a 6-digit code.")]
    public string Otp { get; set; } = string.Empty;
}

public class ResetPasswordDto
{
    [Required]
    [RegularExpression(@"^\d{13}$", ErrorMessage = "South African ID Number must be exactly 13 digits.")]
    public string IdNumber { get; set; } = string.Empty;

    [Required]
    public string ResetToken { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string NewPassword { get; set; } = string.Empty;

    [Required]
    [Compare(nameof(NewPassword))]
    public string ConfirmPassword { get; set; } = string.Empty;
}
