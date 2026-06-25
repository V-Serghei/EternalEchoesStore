using Microsoft.EntityFrameworkCore;
using EternalEchoesStore.Domain.Entities.UserDb;

namespace EternalEchoesStore.Infrastructure.DbContextInfrastructure;

public class UserDbContext : DbContext
{
    public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
    {
    }

    public DbSet<UserDb> UserDb { get; set; }
    public DbSet<UserSession> UserSessions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
        modelBuilder.Entity<UserDb>(b =>
        {
            b.ToTable("userdb", "public");
            b.HasKey(x => x.Id);
        });

        modelBuilder.Entity<UserSession>(entity =>
        {
            entity.ToTable("user_sessions", "public");
            entity.HasKey(e => e.Id);

            entity.HasOne(e => e.User)
                .WithMany(u => u.UserSessions)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}