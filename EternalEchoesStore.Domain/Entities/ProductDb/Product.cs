namespace EternalEchoesStore.Domain.Entities.ProductDb;

public class Product:BaseEntity
{
    public string Title { get; set; }
    public string Description { get; set; } 
    public string ImageUrl { get; set; }
    public string Category { get; set; }
    public string SubCategory { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public double Rating { get; set; }
    public double SumOfRatings { get; set; } 
    public int NumberOfRatings { get; set; }
    
    
    
}