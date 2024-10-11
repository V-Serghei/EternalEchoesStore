using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Domain.Entities.ProductDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Commands.Product.UpdateProduct;

public class UpdateProductCommandHandler:IRequestHandler<UpdateProductCommand,Unit> 
{
    private readonly ProductDbContext _productDbContext;

    public UpdateProductCommandHandler(ProductDbContext productDbContext)
    {
        _productDbContext = productDbContext;
    }
    
    public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var productToUpdate = await _productDbContext.Products
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (productToUpdate is null)
        {
            throw new NotFoundException($"{nameof(ProductDb)} with {nameof(ProductDb.Id)}: {request.Id}" +
                                        $"was not found in database");
        }

        productToUpdate = request.Adapt<ProductDb>();
        _productDbContext.Products.Update(productToUpdate);
        await _productDbContext.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}