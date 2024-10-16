using EternalEchoesStore.Contracts.Dtos;

namespace EternalEchoesStore.Contracts.Responses;

public record GetProductsResponse(List<ProductDto> ProductDtos);