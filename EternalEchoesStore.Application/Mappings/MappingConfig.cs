using EternalEchoesStore.Contracts.Responses;
using EternalEchoesStore.Contracts.Responses.UserResponses;
using EternalEchoesStore.Domain.Entities.ProductDb;
using EternalEchoesStore.Domain.Entities.UserDb;
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
        
        TypeAdapterConfig<List<UserDb>, GetUsersResponse>.NewConfig()
            .Map(dest => dest.UserDtos, src => src);
        TypeAdapterConfig<UserDb, GetUserByIdResponse>.NewConfig()
            .Map(dest => dest.UserDto, src => src);
    }
}