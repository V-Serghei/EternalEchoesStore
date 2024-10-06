using MediatR;

namespace EternalEchoesStore.Application.Commands.Product.CreateProduct;

public record CreareProductCommand(string Title, string Description, DateTime CreatedAt, string ImageUrl, string Category, string SubCategory):
IRequest<int>;