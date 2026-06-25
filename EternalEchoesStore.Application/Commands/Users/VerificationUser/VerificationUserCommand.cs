using MediatR;

namespace EternalEchoesStore.Application.Commands.Users.VerificationUser;

public record VerificationUserCommand(string Email, string Password) 
    : IRequest<string>;