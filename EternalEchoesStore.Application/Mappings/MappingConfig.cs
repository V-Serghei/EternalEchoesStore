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
    }
}