using EternalEchoesStore.Domain.Entities.UserDb;
using FluentValidation;

namespace EternalEchoesStore.Application.Commands.Users.DeleteUser;

public class DeleteUserCommandValidator : AbstractValidator<DeleteUserCommand>
{
    public DeleteUserCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty()
            .WithMessage($"{nameof(UserDb.Id)} cannot be empty");
    }
}