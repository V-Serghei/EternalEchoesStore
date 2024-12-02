namespace EternalEchoesStore.Domain.Entities.UserDb;

public class UserSession: BaseEntity
{
    public int UserId { get; set; } 
    public virtual UserDb User { get; set; }
    public string JwtToken { get; set; }
    public DateTime ExpiresAt { get; set; }
}