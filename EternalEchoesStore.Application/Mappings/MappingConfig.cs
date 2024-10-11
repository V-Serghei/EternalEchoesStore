using EternalEchoesStore.Application.Commands.Product.CreateProduct;
using EternalEchoesStore.Application.Commands.Product.UpdateProduct;
using EternalEchoesStore.Contracts.Responses;
using EternalEchoesStore.Domain.Entities.ProductDb;
using Mapster;

namespace EternalEchoesStore.Application.Mappings;

public class MappingConfig
{
    public static void Configure()
    {
        TypeAdapterConfig<List<ProductDb>, GetProductResponse>.NewConfig()
            .Map(dest => dest.ProductDtos, src => src);
        TypeAdapterConfig<ProductDb, GetProductByIdRespons>.NewConfig()
            .Map(dest => dest.ProductDto, src => src);
        TypeAdapterConfig<ProductDb, CreateProductCommand>.NewConfig()
            .Map(dist => dist, src => src);
        TypeAdapterConfig<CreateProductCommand, ProductDb>.NewConfig()
            .Map(dist => dist, src => src);
        TypeAdapterConfig<UpdateProductCommand, ProductDb>.NewConfig()
            .Map(dist => dist, src => src);
        TypeAdapterConfig<ProductDb, UpdateProductCommand>.NewConfig()
            .Map(dist => dist, src => src);
    }
}