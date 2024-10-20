using MediatR;

namespace EternalEchoesStore.Application.Commands.Users.DeleteUser;

public record DeleteUserCommand(int Id) : IRequest<Unit>;