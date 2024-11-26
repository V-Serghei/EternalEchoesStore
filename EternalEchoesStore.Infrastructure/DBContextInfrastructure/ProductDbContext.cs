using EternalEchoesStore.Domain.Entities.ProductDb;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Infrastructure.DbContextInfrastructure;

public class ProductDbContext: DbContext
{
    public ProductDbContext(DbContextOptions<ProductDbContext> options): base(options)
    {
        
    }
    public DbSet<Product> Products { get; set; }
}