using System.Diagnostics.CodeAnalysis;

namespace EternalEchoesStore.Domain.Entities.ProductDb;

public class Product:BaseEntity
{
    [NotNull]
    public string Title { get; set; }
    [NotNull]
    public string Description { get; set; } 
    public string ImageUrl { get; set; }
    [NotNull]
    public string Category { get; set; }
    public string SubCategory { get; set; }
    
    public string SubSubCategory { get; set; }
    [NotNull]
    public decimal Price { get; set; }
    [NotNull]
    public int Quantity { get; set; }
    public double Rating { get; set; }
    public bool IsAvailable { get; set; } = true;
    public decimal Discount { get; set; }
    public string SKU { get; set; }
    
    
    public virtual ICollection<CartItems> CartItems { get; set; } = new List<CartItems>();
    public virtual ICollection<ProductDbUserDb> UserReviews { get; set; } = new List<ProductDbUserDb>();
    
}