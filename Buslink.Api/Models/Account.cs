public class Account
{
    public int AccountId { get; set; }
    public required int UserId { get; set; }
    public decimal Balance { get; set; }
    public string Currency { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}