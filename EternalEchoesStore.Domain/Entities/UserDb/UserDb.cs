namespace EternalEchoesStore.Domain.Entities.UserDb;

public class UserDb : BaseEntity
{
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Photo { get; set; }
}