namespace EternalEchoesStore.Contracts.Requests.Products;

public record UpdateProductRequest( string Title, string Description,
    string ImageUrl, string Category, string SubCategory);