using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Contracts.Responses;
using EternalEchoesStore.Domain.Entities.ProductDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Queries.Product.GetProductById;

public class GetProductByIdQueryHandler:IRequestHandler<GetProductByIdQuery, GetProductByIdRespons>
{
    private readonly ProductDbContext _productDbContext;

    public GetProductByIdQueryHandler(ProductDbContext productDbContext)
    {
        _productDbContext = productDbContext;
    }
    
    public async Task<GetProductByIdRespons> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _productDbContext.Products.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (product is null)
        {
            throw new NotFoundException($"{nameof(ProductDb)} with {nameof(ProductDb.Id)}: {request.Id}" +
                                        $"was not found in database");
        }

        return product.Adapt<GetProductByIdRespons>();
    }
}