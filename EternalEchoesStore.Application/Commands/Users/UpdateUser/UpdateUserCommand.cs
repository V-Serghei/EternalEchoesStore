using MediatR;

namespace EternalEchoesStore.Application.Commands.Users.UpdateUser;

public record UpdateUserCommand(int Id, string Name, string Surname, string Email, string Password, string Photo) 
    : IRequest<Unit>;