using System.ComponentModel.DataAnnotations;

namespace Buslink.Api.DTOs.Auth;

public class RegisterPassengerDto
{
    [Required]
    [RegularExpression(@"^\d{13}$",
    ErrorMessage = "South African ID Number must be exactly 13 digits.")]
    public string UserId { get; set; } = string.Empty;
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Surname { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Phone]
    [Required]
    [RegularExpression(@"^\d{10}$",
    ErrorMessage = "Phone number must be exactly 10 digits.")]
    public string PhoneNumber { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;

    [Required]
    [Compare(nameof(Password))]
    public string ConfirmPassword { get; set; } = string.Empty;
}