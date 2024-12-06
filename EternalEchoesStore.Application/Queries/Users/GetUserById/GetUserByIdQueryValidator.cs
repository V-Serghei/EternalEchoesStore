using EternalEchoesStore.Domain.Entities.UserDb;
using FluentValidation;

namespace EternalEchoesStore.Application.Queries.Users.GetUserById;

public class GetUserByIdQueryValidator : AbstractValidator<GetUserByIdQuery>
{
    public GetUserByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage($"{nameof(UserDb.Id)} cannot be empty");
    }
}