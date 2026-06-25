using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace EternalEchoesStore.Domain.Entities.ProductDb;

public class CartItems: BaseEntity
{
    [NotNull]
    public int UserId { get; set; }
    public virtual UserDb.UserDb User { get; set; }
    
    [NotNull]
    public int ProductId { get; set; }
    public virtual Product Product { get; set; }
    
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal TotalPrice { get; set; }
    public string Status { get; set; }
    
    
}