using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;

namespace EternalEchoesStore.Application.Commands.Products.CreateProduct;

public class CreateProductCommandHandler:IRequestHandler<CreateProductCommand,int>
{
    private readonly ProductDbContext _productDbContext;

    public CreateProductCommandHandler(ProductDbContext productDbContext)
    {
        _productDbContext = productDbContext;
    }
    public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = new Domain.Entities.ProductDb.Product
        {
            Title = request.Title,
            Description = request.Description,
            ImageUrl = request.ImageUrl,
            Category = request.Category,
            SubCategory = request.SubCategory,
            CreatedAt = DateTime.UtcNow,
        };
        await _productDbContext.Products.AddAsync(product, cancellationToken);
        await _productDbContext.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}

