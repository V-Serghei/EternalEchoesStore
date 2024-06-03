using EternalEchoesStore.Domain.Entities.ProductDb;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Infrastructure.DbContextInfrastructure;

public class ProductDbContext: DbContext
{
    public ProductDbContext(DbContextOptions options): base(options)
    {
        
    }
    public DbSet<ProductDb> Products { get; set; }
}