using FluentValidation;

namespace EternalEchoesStore.Application.Commands.Products.RatingProduct;

public class UpdateProductRatingCommandValidator: AbstractValidator<UpdateProductRatingCommand>
{
    public UpdateProductRatingCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage($"{nameof(Domain.Entities.ProductDb.Product.Id)} cannot be empty");
        RuleFor(x => x.Rating)
            .NotEmpty()
            .WithMessage($"{nameof(Domain.Entities.ProductDb.Product.Rating)} cannot be empty");
    }
}