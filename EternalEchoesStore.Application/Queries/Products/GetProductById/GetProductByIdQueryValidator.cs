using EternalEchoesStore.Domain.Entities.ProductDb;
using FluentValidation;

namespace EternalEchoesStore.Application.Queries.Product.GetProductById;

public class GetProductByIdQueryValidator:AbstractValidator<GetProductByIdQuery>
{
    public GetProductByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage($"{nameof(Domain.Entities.ProductDb.Product.Id)} cannot be empty");
    }
}