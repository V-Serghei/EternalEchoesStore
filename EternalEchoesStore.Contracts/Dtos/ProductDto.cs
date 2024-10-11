namespace EternalEchoesStore.Contracts.Dtos;

public record ProductDto(int Id, string Title, string Description, 
    DateTime CreatedAt, string ImageUrl, string Category, string SubCategory);