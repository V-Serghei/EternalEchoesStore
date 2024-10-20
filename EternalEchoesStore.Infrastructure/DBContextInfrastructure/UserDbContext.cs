using EternalEchoesStore.Domain.Entities.UserDb;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Infrastructure.DbContextInfrastructure;

public class UserDbContext : DbContext
{
    public UserDbContext(DbContextOptions options) : base(options)
    {
        
    }
    public DbSet<UserDb> Users { get; set; }
}