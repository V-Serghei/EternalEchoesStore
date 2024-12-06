namespace EternalEchoesStore.Contracts.Requests.Users;

public record CreateUserRequest(string Name, string Surname, string Email, string Password, string Photo);