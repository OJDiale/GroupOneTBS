using System.ComponentModel.DataAnnotations;

namespace Buslink.Api.DTOs.Auth;

public class LoginPassengerDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}