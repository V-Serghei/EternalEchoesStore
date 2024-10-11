namespace EternalEchoesStore.Contracts.Requests.Products;

public record UpdateProductRequest( string Title, string Description, 
    DateTime CreatedAt, string ImageUrl, string Category, string SubCategory);