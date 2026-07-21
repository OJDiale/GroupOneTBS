using Buslink.Api.Data;
using Buslink.Api.DTOs.Auth;
using Buslink.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Buslink.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IPasswordHasher<Passenger> _passwordHasher;

    public AuthController(
        ApplicationDbContext context,
        IPasswordHasher<Passenger> passwordHasher)
    {
        _context = context;
        _passwordHasher = passwordHasher;
    }

    // 👇 ADD THE REGISTER METHOD HERE

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterPassengerDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        bool emailExists = await _context.Passengers
            .AnyAsync(x => x.Email == dto.Email);

        if (emailExists)
        {
            return BadRequest(new
            {
                message = "Email is already registered."
            });
        }

        var passenger = new Passenger
        {
            Name = dto.Name,
            Surname = dto.Surname,
            Email = dto.Email,
            PhoneNumber = dto.PhoneNumber,
            PasswordHash = string.Empty
            
        };

        passenger.PasswordHash =
            _passwordHasher.HashPassword(passenger, dto.Password);

        _context.Passengers.Add(passenger);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Passenger registered successfully."
        });
    }

}