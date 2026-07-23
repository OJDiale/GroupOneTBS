using System.ComponentModel.DataAnnotations;

namespace Buslink.Api.DTOs.Wallet;

public class TopUpWalletDto
{
    [Required]
    [Range(1, 5000)]
    public decimal Amount { get; set; }
}