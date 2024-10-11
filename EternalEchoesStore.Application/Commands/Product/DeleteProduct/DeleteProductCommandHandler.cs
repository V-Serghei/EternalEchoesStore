using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Domain.Entities.ProductDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Commands.Product.DeleteProduct;

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
            throw new NotFoundException($"{nameof(ProductDb)} with {nameof(ProductDb.Id)}: {request.Id}" +
                                        $"was not found in database");
        }

        _productDbContext.Products.Remove(productDel);
        await _productDbContext.SaveChangesAsync(cancellationToken);
        return Unit.Value;
    }
}