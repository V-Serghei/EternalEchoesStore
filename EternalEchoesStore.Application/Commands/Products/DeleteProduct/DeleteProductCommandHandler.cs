using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Commands.Products.DeleteProduct;

public class DeleteProductCommandHandler:IRequestHandler<DeleteProductCommand,Unit>
{
    private readonly ProductDbContext _productDbContext;

    public DeleteProductCommandHandler(ProductDbContext productDbContext)
    {
        _productDbContext = productDbContext;
    }
    
    public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var productDel = await _productDbContext.Products.
            FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

        if (productDel is null)
        {
            throw new NotFoundException($"{nameof(Domain.Entities.ProductDb.Product)} with {nameof(Domain.Entities.ProductDb.Product.Id)}: {request.Id}" +
                                        $"was not found in database");
        }

        _productDbContext.Products.Remove(productDel);
        await _productDbContext.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}