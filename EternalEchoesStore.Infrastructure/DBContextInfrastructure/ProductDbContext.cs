using EternalEchoesStore.Domain.Entities.ProductDb;
using EternalEchoesStore.Domain.Entities.UserDb;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Infrastructure.DbContextInfrastructure;

public class ProductDbContext: DbContext
{
public ProductDbContext(DbContextOptions<ProductDbContext> options): base(options)
{
    
}
public DbSet<Product> Products { get; set; }
public DbSet<ProductDbUserDb> UsersProductDbUserDbs { get; set; }
public DbSet<CartItems> CartItems { get; set; }

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<ProductDbUserDb>(entity =>
    {
        entity.HasKey(e => e.Id );
    
        entity.HasOne(e => e.Product)
            .WithMany(p => p.UserReviews)
            .HasForeignKey(e => e.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasOne(e => e.User)
            .WithMany(u => u.ProductReviews)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    });

    modelBuilder.Entity<CartItems>(entity =>
    {
        entity.HasOne(e => e.User)
            .WithMany(u => u.CartItems)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasOne(e => e.Product)
            .WithMany(p => p.CartItems)
            .HasForeignKey(e => e.ProductId)
            .OnDelete(DeleteBehavior.Cascade);
    });
}

}