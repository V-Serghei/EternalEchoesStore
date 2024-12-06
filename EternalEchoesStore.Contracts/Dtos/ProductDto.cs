namespace EternalEchoesStore.Contracts.Dtos;

public record ProductDto(int Id, string Title, string Description, 
    DateTime CreatedAt, string ImageUrl, string Category, string SubCategory, 
    decimal Price, int Quantity, double Rating,int NumberOfRatings, double SumOfRatings);