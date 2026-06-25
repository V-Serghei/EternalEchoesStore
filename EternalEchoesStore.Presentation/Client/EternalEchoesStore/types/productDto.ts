export interface ProductDto {
    id: number | undefined;
    title: string;
    description: string;
    createdAt: string | undefined;
    imageUrl: string | undefined;
    category: string;
    subCategory: string | undefined;
    subSubCategory: string | undefined; 
    price: number | undefined;
    quantity: number | undefined;
    rating: number | undefined;
    isAvailable: boolean; 
    discount: number | undefined; 
    SKU: string | undefined; 
}
