using MediatR;

namespace EternalEchoesStore.Application.Commands.Product.UpdateProduct;

public record UpdateProductCommand(int Id, string Title, string Description, DateTime CreatedAt,
    string ImageUrl, string Category, string SubCategory):IRequest<Unit>;