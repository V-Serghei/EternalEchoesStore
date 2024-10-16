using EternalEchoesStore.Contracts.Responses;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Queries.Products.GetProducts;

public class GetProductsQueryHandler:IRequestHandler<GetProductsQuery, GetProductsResponse>
{
    private readonly ProductDbContext _productDbContext;

    public GetProductsQueryHandler(ProductDbContext productDbContext)
    {
        _productDbContext = productDbContext;
    }
    
    public async Task<GetProductsResponse> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await _productDbContext.Products.ToListAsync(cancellationToken);
        
        return products.Adapt<GetProductsResponse>();
    }
}