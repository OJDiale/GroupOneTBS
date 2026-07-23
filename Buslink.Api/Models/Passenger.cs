namespace Buslink.Api.Models;

public class Passenger
{
    public required string UserId { get; set; }

    public required string Name { get; set; }
    public required string Surname { get; set; }

    public required string Email { get; set; }

    public string? PhoneNumber { get; set; }

    public required string PasswordHash { get; set; }

    public bool IsVerified { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public Cards? Card { get; set; }
    
    public Wallet? Wallet { get; set; }
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}