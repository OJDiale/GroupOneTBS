namespace Buslink.Api.Models;

public class Cards
{
    public int CardId { get; set; }
    public string CardNumber { get; set; } = string.Empty;
    public decimal Balance { get; set; } = 0.00m;
    public string Status { get; set; } = "Active";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int PassengerId { get; set; }
    public Passenger? Passenger { get; set; }=null!;
    public List<Transaction> Transactions { get; set; } = new();
}
