namespace EternalEchoesStore.Contracts.Requests.Products;

public record CreateProductRequest(string Title, string Description, 
    DateTime CreatedAt, string ImageUrl, string Category, string SubCategory);