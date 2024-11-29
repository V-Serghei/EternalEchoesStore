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


protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<ProductDbUserDb>(entity =>
    {
        entity.HasKey(e => new { e.ProductId, e.UserId });

        entity.HasOne(e => e.Product)
            .WithMany()
            .HasForeignKey(e => e.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        entity.HasOne(e => e.User)
            .WithMany()
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    });
}

}