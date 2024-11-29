using EternalEchoesStore.Domain.Entities.UserDb;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Infrastructure.DbContextInfrastructure;

public class UserDbContext : DbContext
{
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
    {
        
    }
    public DbSet<UserDb> UserDb { get; set; }
}