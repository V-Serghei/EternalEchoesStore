namespace EternalEchoesStore.Contracts.Requests.Users;

public record UpdateUserRequest(int Id, string Name, string Surname, string Email, string Password, string Photo);