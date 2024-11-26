using MediatR;

namespace EternalEchoesStore.Application.Commands.Products.UpdateProduct;

public record UpdateProductCommand(int Id, string Title, string Description,
    string ImageUrl, string Category, string SubCategory,  decimal Price, int Quantity, double Rating):IRequest<Unit>;