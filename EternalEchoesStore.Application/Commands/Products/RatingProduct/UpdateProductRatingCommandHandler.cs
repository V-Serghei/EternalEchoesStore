using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EternalEchoesStore.Application.Commands.Products.DeleteProduct;
using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Domain.Entities.ProductDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.AspNetCore.Http;
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
    

    // Проверяем существование продукта
    var product = await _productDbContext.Products
        .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
    if (product is null)
    {
        throw new NotFoundException($"{nameof(Domain.Entities.ProductDb.Product)} with {nameof(Domain.Entities.ProductDb.Product.Id)}: {request.Id} was not found in database");
    }

    var userRating = await _productDbContext.UsersProductDbUserDbs
        .FirstOrDefaultAsync(ur => ur.ProductId == request.Id && ur.UserId == 2, cancellationToken);

    if (userRating != null)
    {
        userRating.UserRating = request.Rating;
        _productDbContext.UsersProductDbUserDbs.Update(userRating);
    }
    else
    {
        _productDbContext.UsersProductDbUserDbs.Add(new ProductDbUserDb
        {
            ProductId = request.Id,
            UserId = 2,
            UserRating = request.Rating,
            ReviewDate = DateTime.UtcNow
        });
    }

    await _productDbContext.SaveChangesAsync(cancellationToken);

    await UpdateProductAverageRatingAsync(request.Id, cancellationToken);

    return Unit.Value;
}

private async Task UpdateProductAverageRatingAsync(int productId, CancellationToken cancellationToken)
{
    var averageRating = await _productDbContext.UsersProductDbUserDbs
        .Where(ur => ur.ProductId == productId)
        .AverageAsync(ur => ur.UserRating, cancellationToken);

    var product = await _productDbContext.Products
        .FirstOrDefaultAsync(p => p.Id == productId, cancellationToken);
    if (product != null)
    {
        product.Rating = averageRating;
        _productDbContext.Products.Update(product);
        await _productDbContext.SaveChangesAsync(cancellationToken);
    }
}


}