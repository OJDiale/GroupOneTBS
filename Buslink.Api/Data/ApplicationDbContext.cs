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
    public DbSet<Cards> Cards => Set<Cards>();
    public DbSet<Transaction> Transactions => Set<Transaction>();

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

    modelBuilder.Entity<Cards>(entity =>
{
    entity.HasKey(card => card.CardId);

    entity.Property(card => card.CardNumber)
        .HasMaxLength(20)
        .IsRequired();

    entity.HasIndex(card => card.CardNumber)
        .IsUnique();

    entity.Property(card => card.Balance)
        .HasPrecision(10, 2);

    entity.Property(card => card.Status)
        .HasMaxLength(20)
        .IsRequired();

    entity.HasOne(card => card.Passenger)
        .WithOne(passenger => passenger.Card)
        .HasForeignKey<Cards>(card => card.PassengerId)
        .HasPrincipalKey<Passenger>(passenger => passenger.UserId);
});
    }
}