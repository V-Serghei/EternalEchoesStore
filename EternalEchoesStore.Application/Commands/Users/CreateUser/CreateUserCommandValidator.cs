using System.Text.RegularExpressions;
using EternalEchoesStore.Domain.Entities.UserDb;
using FluentValidation;

namespace EternalEchoesStore.Application.Commands.Users.CreateUser;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage($"{nameof(UserDb.Name)} cannot be empty")
            .MaximumLength(30)
            .WithMessage($"{nameof(UserDb.Name)} cannot be longer than 30 characters");
        RuleFor(x => x.Surname)
            .NotEmpty()
            .WithMessage($"{nameof(UserDb.Surname)} cannot be empty")
            .MaximumLength(40)
            .WithMessage($"{nameof(UserDb.Surname)} cannot be longer than 40 characters");
        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage($"{nameof(UserDb.Password)} cannot be empty")
            .MinimumLength(10)
            .WithMessage($"{nameof(UserDb.Password)} cannot be less than 10 characters")
            .MaximumLength(35)
            .WithMessage($"{nameof(UserDb.Password)} cannot be longer than 35 characters");
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage($"{nameof(UserDb.Email)} cannot be empty")
            .Must(IsValidEmail)
            .WithMessage($"{nameof(UserDb.Email)} must have a valid format (example: name@domain.com)")
            .MaximumLength(40)
            .WithMessage($"{nameof(UserDb.Email)} cannot be longer than 40 characters");
    }
    private bool IsValidEmail(string email)
    {
        var emailRegex = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
        return Regex.IsMatch(email, emailRegex);
    }
}