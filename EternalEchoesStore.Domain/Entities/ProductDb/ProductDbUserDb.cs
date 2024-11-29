    namespace EternalEchoesStore.Domain.Entities.ProductDb;

    public class ProductDbUserDb
    {
        
        public int ProductId { get; set; }
        public Product Product { get; set; }
        
        public int UserId { get; set; }
        public virtual UserDb.UserDb User { get; set; }

        public double UserRating { get; set; } = 0;
        public string? Review { get; set; } 
        public DateTime ReviewDate { get; set; }
        public int OrderCount { get; set; } = 0;
    }