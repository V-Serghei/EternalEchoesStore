using EternalEchoesStore.Domain.Entities.ProductDb;
using EternalEchoesStore.Domain.Enums.Role;

namespace EternalEchoesStore.Domain.Entities.UserDb;

public class UserDb : BaseEntity
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Photo { get; set; }
    public Role Role { get; set; }
    
    public virtual ICollection<CartItems> CartItems { get; set; } = new List<CartItems>();
    public virtual ICollection<ProductDbUserDb> ProductReviews { get; set; } = new List<ProductDbUserDb>();
    public virtual ICollection<UserSession> UserSessions { get; set; } = new List<UserSession>(); 
}