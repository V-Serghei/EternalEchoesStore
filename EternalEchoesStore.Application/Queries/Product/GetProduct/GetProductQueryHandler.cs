using EternalEchoesStore.Contracts.Responses;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Queries.Product.GetProduct;

public class GetProductQueryHandler:IRequestHandler<GetProductQuery, GetProductResponse>
{
    private readonly ProductDbContext _productDbContext;

    public GetProductQueryHandler(ProductDbContext productDbContext)
    {
        _productDbContext = productDbContext;
    }
    
    public async Task<GetProductResponse> Handle(GetProductQuery request, CancellationToken cancellationToken)
    {
        var product = await _productDbContext.Products.ToListAsync(cancellationToken);

        return product.Adapt<GetProductResponse>();
    }
}