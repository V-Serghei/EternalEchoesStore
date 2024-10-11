using EternalEchoesStore.Domain.Entities.ProductDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;

namespace EternalEchoesStore.Application.Commands.Product.CreateProduct;

public class CreateProductCommandHandler:IRequestHandler<CreateProductCommand,int>
{
    private readonly ProductDbContext _productDbContext;

    public CreateProductCommandHandler(ProductDbContext productDbContext)
    {
        _productDbContext = productDbContext;
    }
    public async Task<int> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var product = request.Adapt<ProductDb>();
        await _productDbContext.Products.AddAsync(product, cancellationToken);
        await _productDbContext.SaveChangesAsync(cancellationToken);

        return product.Id;
    }
}

