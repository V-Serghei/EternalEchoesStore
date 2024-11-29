using MediatR;

namespace EternalEchoesStore.Application.Commands.Users.CreateUser;

public record CreateUserCommand(string Name, string Surname, string Email, string Password, string Photo) : 
    IRequest<string>;