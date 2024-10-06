using EternalEchoesStore.Contracts.Dtos;

namespace EternalEchoesStore.Contracts.Responses;

public record GetProductResponse(List<ProductDto> ProductDtos);