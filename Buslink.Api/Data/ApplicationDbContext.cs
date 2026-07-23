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
    
    public DbSet<Wallet> Wallets => Set<Wallet>();
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

            entity.Property(passenger => passenger.OtpCodeHash)
                .HasMaxLength(64);

            entity.Property(passenger => passenger.OtpPurpose)
                .HasMaxLength(50);

            entity.Property(passenger => passenger.PasswordResetTokenHash)
                .HasMaxLength(64);


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

//  
modelBuilder.Entity<Wallet>(entity =>
{
    entity.HasKey(x => x.WalletId);

    entity.Property(x => x.Balance)
          .HasPrecision(10, 2);

    entity.HasOne(x => x.Passenger)
          .WithOne(x => x.Wallet)
          .HasForeignKey<Wallet>(x => x.PassengerId)
          .HasPrincipalKey<Passenger>(x => x.UserId);
});

modelBuilder.Entity<Transaction>(entity =>
{
    entity.HasKey(t => t.TransactionId);

    entity.Property(t => t.Amount)
          .HasPrecision(10, 2);

    entity.Property(t => t.BalanceAfter)
          .HasPrecision(10, 2);

    entity.Property(t => t.TransactionType)
          .HasMaxLength(20)
          .IsRequired();

    entity.Property(t => t.Description)
          .HasMaxLength(200);

    entity.HasOne(t => t.Wallet)
          .WithMany(w => w.Transactions)
          .HasForeignKey(t => t.WalletId);

    entity.HasOne(t => t.Passenger)
          .WithMany(p => p.Transactions)
          .HasForeignKey(t => t.PassengerId)
          .HasPrincipalKey(p => p.UserId);
});
    }
}
