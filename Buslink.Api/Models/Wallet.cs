namespace Buslink.Api.Models;

public class Wallet
{
    public int WalletId { get; set; }

    // Each passenger has one wallet
    public int PassengerId { get; set; }

    public decimal Balance { get; set; } = 0.00m;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Passenger Passenger { get; set; } = null!;

    public List<Transaction> Transactions { get; set; } = new();
}