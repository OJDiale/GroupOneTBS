namespace Buslink.Api.Models;

public class Passenger
{
    public int UserId { get; set; }

    public required string Name { get; set; }
     public required string Surname { get; set; }
    
    public required string Email { get; set; } 

    public string? PhoneNumber { get; set; }

    public required string PasswordHash { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}