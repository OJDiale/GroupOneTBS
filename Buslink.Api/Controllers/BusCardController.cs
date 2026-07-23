using Buslink.Api.Data;
using Buslink.Api.DTOs.BusCard;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Buslink.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class BusCardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BusCardController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetCard()
    {
        var passengerIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(passengerIdString))
            return Unauthorized();

        // Convert the token's string value to int to match Cards.PassengerId
        int passengerId = int.Parse(passengerIdString);

        var card = await _context.Cards
            .FirstOrDefaultAsync(c => c.PassengerId == passengerId);

        if (card == null)
            return NotFound(new
            {
                message = "Bus card not found."
            });

        var dto = new CardDto
        {
            CardNumber = MaskCardNumber(card.CardNumber),
            Balance = card.Balance,
            Status = card.Status,
            CreatedAt = card.CreatedAt
        };

        return Ok(dto);
    }

    private string MaskCardNumber(string cardNumber)
    {
        if (cardNumber.Length <= 4)
            return cardNumber;

        return new string('*', cardNumber.Length - 4)
               + cardNumber[^4..];
    }
}