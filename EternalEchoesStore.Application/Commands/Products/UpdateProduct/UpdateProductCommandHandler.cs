using System.Threading;
using System.Threading.Tasks;
using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Domain.Entities.ProductDb;
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

        productToUpdate.SubCategory = request.SubCategory;
        productToUpdate.Title = request.Title;
        productToUpdate.Description = request.Description;
        productToUpdate.ImageUrl = request.ImageUrl;
        productToUpdate.Category = request.Category;
        _productDbContext.Products.Update(productToUpdate);
        await _productDbContext.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}