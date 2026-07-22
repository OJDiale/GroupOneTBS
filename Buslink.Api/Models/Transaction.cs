namespace Buslink.Api.Models;

public class Transaction
{
    public int Id { get; set; }
    public int CardId { get; set; }
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; } = string.Empty; // "Ozow" or "PayFlex"
    public string Status { get; set; } = "Success";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public Cards? Card { get; set; }
}
