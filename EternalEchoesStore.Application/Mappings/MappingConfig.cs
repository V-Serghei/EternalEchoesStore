using EternalEchoesStore.Application.Commands.Products.CreateProduct;
using EternalEchoesStore.Application.Commands.Products.UpdateProduct;
using EternalEchoesStore.Contracts.Responses;
using EternalEchoesStore.Domain.Entities.ProductDb;
using Mapster;

namespace EternalEchoesStore.Application.Mappings;

public class MappingConfig
{
    public static void Configure()
    {
        TypeAdapterConfig<List<Product>, GetProductsResponse>.NewConfig()
            .Map(dest => dest.ProductDtos, src => src);
        TypeAdapterConfig<GetProductsResponse, List<Product>>.NewConfig()
            .Map(dest => dest, src => src.ProductDtos);
        
        TypeAdapterConfig<Product, GetProductByIdResponse>.NewConfig()
            .Map(dest => dest.ProductDto, src => src);
        TypeAdapterConfig<Product, CreateProductCommand>.NewConfig()
            .Map(dist => dist, src => src);
        TypeAdapterConfig<CreateProductCommand, Product>.NewConfig()
            .Map(dist => dist, src => src);
        TypeAdapterConfig<UpdateProductCommand, Product>.NewConfig()
            .Map(dist => dist, src => src);
        TypeAdapterConfig<Product, UpdateProductCommand>.NewConfig()
            .Map(dist => dist, src => src);
    }
}