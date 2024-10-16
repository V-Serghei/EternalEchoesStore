using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Commands.Products.UpdateProduct;

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
            throw new NotFoundException($"{nameof(Domain.Entities.ProductDb.Product)} with {nameof(Domain.Entities.ProductDb.Product.Id)}: {request.Id}" +
                                        $"was not found in database");
        }

        productToUpdate = request.Adapt<Domain.Entities.ProductDb.Product>();
        _productDbContext.Products.Update(productToUpdate);
        await _productDbContext.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}