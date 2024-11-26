using EternalEchoesStore.Application.Commands.Products.DeleteProduct;
using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Commands.Products.RatingProduct;

public class UpdateProductRatingCommandHandler:IRequestHandler<UpdateProductRatingCommand,Unit>
{
    
private readonly ProductDbContext _productDbContext;

public UpdateProductRatingCommandHandler(ProductDbContext productDbContext)
{
    _productDbContext = productDbContext;
}
public async Task<Unit> Handle(UpdateProductRatingCommand request, CancellationToken cancellationToken)
{
    var product = _productDbContext.Products.FirstOrDefault(x => x.Id == request.Id);
    if (product is null)
    {
        throw new NotFoundException($"{nameof(Domain.Entities.ProductDb.Product)} with {nameof(Domain.Entities.ProductDb.Product.Id)}: {request.Id}" +
                                    $"was not found in database");
    }
    product.SumOfRatings += request.Rating;
    product.NumberOfRatings += 1; 
    product.Rating = product.SumOfRatings / product.NumberOfRatings; 
    
    _productDbContext.Products.Update(product);
    await _productDbContext.SaveChangesAsync(cancellationToken);
    return Unit.Value;
}
}