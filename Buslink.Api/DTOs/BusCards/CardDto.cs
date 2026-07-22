namespace Buslink.Api.DTOs.BusCard;

public class CardDto
{
    public string CardNumber { get; set; } = string.Empty;

    public decimal Balance { get; set; }

    public string Status { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}