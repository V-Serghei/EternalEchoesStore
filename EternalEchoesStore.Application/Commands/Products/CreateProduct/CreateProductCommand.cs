using MediatR;

namespace EternalEchoesStore.Application.Commands.Products.CreateProduct;

public record CreateProductCommand(string Title, string Description,
    string ImageUrl, string Category, string SubCategory): IRequest<int>;