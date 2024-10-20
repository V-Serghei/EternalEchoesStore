namespace EternalEchoesStore.Contracts.Dtos;

public record UserDto(int Id, string Name, string Surname, string Email, string Password, string Photo, DateTime CreatedAt);