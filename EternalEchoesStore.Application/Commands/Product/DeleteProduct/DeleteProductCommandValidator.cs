using EternalEchoesStore.Domain.Entities.ProductDb;
using FluentValidation;

namespace EternalEchoesStore.Application.Commands.Product.DeleteProduct;

public class DeleteProductCommandValidator : AbstractValidator<DeleteProductCommand>
{
    public DeleteProductCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage($"{nameof(ProductDb.Id)} cannot be empty");
    }
}