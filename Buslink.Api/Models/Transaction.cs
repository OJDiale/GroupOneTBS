namespace Buslink.Api.Models;

public class Transaction
{
    public int TransactionId { get; set; }

    // Foreign Keys
    public int PassengerId { get; set; }

    public int WalletId { get; set; }

    // Transaction Details
    public decimal Amount { get; set; }

    // TopUp, Fare, Refund
    public string TransactionType { get; set; } = string.Empty;

    // e.g. "Bus Fare (Pretoria → Hatfield)"
    public string Description { get; set; } = string.Empty;

    // Wallet balance after transaction
    public decimal BalanceAfter { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation Properties
    public Passenger Passenger { get; set; } = null!;

    public Wallet Wallet { get; set; } = null!;
}