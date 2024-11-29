namespace EternalEchoesStore.Contracts.Requests.Products;

public record CreateProductRequest(string Title, string Description,
    string ImageUrl, string Category, string SubCategory, decimal Price, 
    int Quantity, double Rating);