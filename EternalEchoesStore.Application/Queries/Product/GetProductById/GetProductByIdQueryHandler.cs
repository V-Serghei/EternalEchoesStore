using EternalEchoesStore.Contracts.Responses;
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
            throw new Exception();
        }

        return product.Adapt<GetProductByIdRespons>();
    }
}