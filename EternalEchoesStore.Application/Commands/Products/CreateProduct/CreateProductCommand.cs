using MediatR;

namespace EternalEchoesStore.Application.Commands.Products.CreateProduct;

public record CreateProductCommand(string Title, string Description,
    string ImageUrl, string Category, string SubCategory, 
    decimal Price, int Quantity, double Rating,string SubSubCategory,
    bool IsAvailable,decimal Discount,string SKU ): IRequest<int>;