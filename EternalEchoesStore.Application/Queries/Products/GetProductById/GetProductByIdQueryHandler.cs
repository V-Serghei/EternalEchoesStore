using System.Threading;
using System.Threading.Tasks;
using EternalEchoesStore.Application.Queries.Product.GetProductById;
using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Contracts.Responses;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Queries.Products.GetProductById;

public class GetProductByIdQueryHandler:IRequestHandler<GetProductByIdQuery, GetProductByIdResponse>
{
    private readonly ProductDbContext _productDbContext;
 
    public GetProductByIdQueryHandler(ProductDbContext productDbContext)
    {
        _productDbContext = productDbContext;
    }
    
    public async Task<GetProductByIdResponse> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await _productDbContext.Products.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (product is null)
        {
            throw new NotFoundException($"{nameof(Domain.Entities.ProductDb.Product)} with {nameof(Domain.Entities.ProductDb.Product.Id)}: {request.Id}" +
                                        $"was not found in database");
        }

        return product.Adapt<GetProductByIdResponse>();
    }
}