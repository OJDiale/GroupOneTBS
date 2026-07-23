using System.ComponentModel.DataAnnotations;

namespace Buslink.Api.DTOs.Auth;

public class VerifyRegistrationOtpDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^\d{6}$", ErrorMessage = "OTP must be a 6-digit code.")]
    public string Otp { get; set; } = string.Empty;
}