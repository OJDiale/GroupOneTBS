using System.ComponentModel.DataAnnotations;

namespace Buslink.Api.DTOs.Auth;

public class ResendRegistrationOtpDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}