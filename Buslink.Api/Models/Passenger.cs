namespace Buslink.Api.Models;

public class Passenger
{
    // Auto-incrementing primary key (matches the SQL script's UserID)
    public int UserId { get; set; }

    // The passenger's real South African ID number, stored separately (not the primary key)
    public required string IdNumber { get; set; }

    public required string Name { get; set; }
    public required string Surname { get; set; }
    public required string Email { get; set; }
    public string? PhoneNumber { get; set; }
    public required string PasswordHash { get; set; }
    public bool IsVerified { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    // Password-reset OTP state. Codes and reset tokens are stored only as hashes.
    public string? OtpCodeHash { get; set; }
    public DateTime? OtpExpiresAt { get; set; }
    public string? OtpPurpose { get; set; }
    public int OtpAttempts { get; set; }
    public string? PasswordResetTokenHash { get; set; }
    public DateTime? PasswordResetTokenExpiresAt { get; set; }

    public Cards? Card { get; set; }
    public Wallet? Wallet { get; set; }
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
