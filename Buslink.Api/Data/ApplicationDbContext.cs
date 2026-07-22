using Microsoft.EntityFrameworkCore;
using Buslink.Api.Models;

namespace Buslink.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Passenger> Passengers => Set<Passenger>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Passenger>(entity =>
        {
            entity.HasKey(passenger => passenger.UserId);

            entity.Property(passenger => passenger.UserId)
              .HasMaxLength(13)
            .IsRequired();

            entity.Property(passenger => passenger.Name)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(passenger => passenger.Surname)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(passenger => passenger.Email)
                .HasMaxLength(191)
                .IsRequired();

            entity.HasIndex(passenger => passenger.Email)
                .IsUnique();

            entity.Property(passenger => passenger.PhoneNumber)
                .HasMaxLength(10);

            entity.Property(passenger => passenger.PasswordHash)
                .HasMaxLength(500)
                .IsRequired();

            entity.Property(passenger => passenger.IsVerified)
                .HasDefaultValue(false);

           
        });
    }
}