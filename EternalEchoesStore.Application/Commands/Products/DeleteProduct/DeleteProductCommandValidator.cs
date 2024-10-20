using FluentValidation;

namespace EternalEchoesStore.Application.Commands.Products.DeleteProduct;

public class DeleteProductCommandValidator : AbstractValidator<DeleteProductCommand>
{
    public DeleteProductCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage($"{nameof(Domain.Entities.ProductDb.Product.Id)} cannot be empty");
    }
}