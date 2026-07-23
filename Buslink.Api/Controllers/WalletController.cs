using Buslink.Api.Data;
using Buslink.Api.DTOs.Wallet;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Buslink.Api.Models;

namespace Buslink.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WalletController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WalletController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetWallet()
    {
        var passengerIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(passengerIdString))
            return Unauthorized();
        int passengerId = int.Parse(passengerIdString);
        var wallet = await _context.Wallets
            .FirstOrDefaultAsync(x => x.PassengerId == passengerId);
        if (wallet == null)
            return NotFound();
        return Ok(new WalletDto
        {
            Balance = wallet.Balance,
            CreatedAt = wallet.CreatedAt
        });
    }
    
    
    // 👇 ADD THE TOPUP METHOD
    
[HttpPost("topup")]
public async Task<IActionResult> TopUp(TopUpWalletDto dto)
{
    var passengerIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrEmpty(passengerIdString))
        return Unauthorized();
    int passengerId = int.Parse(passengerIdString);
    var wallet = await _context.Wallets
        .FirstOrDefaultAsync(x => x.PassengerId == passengerId);
    if (wallet == null)
    {
        return NotFound(new
        {
            message = "Wallet not found."
        });
    }
    wallet.Balance += dto.Amount;

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Wallet topped up successfully.",
        newBalance = wallet.Balance
    });
}

// 👇 ADD THE PAYFARE METHOD
[HttpPost("payfare")]
public async Task<IActionResult> PayFare(PayFareDto dto)
{
    var passengerIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (string.IsNullOrEmpty(passengerIdString))
        return Unauthorized();
    int passengerId = int.Parse(passengerIdString);
    var wallet = await _context.Wallets
        .FirstOrDefaultAsync(w => w.PassengerId == passengerId);
    if (wallet == null)
    {
        return NotFound(new
        {
            message = "Wallet not found."
        });
    }
    if (wallet.Balance < dto.Fare)
    {
        return BadRequest(new
        {
            message = "Insufficient wallet balance."
        });
    }
    wallet.Balance -= dto.Fare;
    var transaction = new Transaction
{
    PassengerId = passengerId, 
    WalletId = wallet.WalletId,
    Amount = -dto.Fare,
    TransactionType = "Fare",
    Description = $"Bus fare ({dto.Route})",
    BalanceAfter = wallet.Balance
};

    _context.Transactions.Add(transaction);

    await _context.SaveChangesAsync();

    return Ok(new
    {
        message = "Fare paid successfully.",
        fare = dto.Fare,
        remainingBalance = wallet.Balance
    });
}
}