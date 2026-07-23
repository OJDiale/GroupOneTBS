using System.ComponentModel.DataAnnotations;

namespace Buslink.Api.DTOs.Wallet;

public class PayFareDto
{
    [Required]
    [Range(1,1000)]
    public decimal Fare { get; set; }

    public string Route { get; set; } = string.Empty;
}