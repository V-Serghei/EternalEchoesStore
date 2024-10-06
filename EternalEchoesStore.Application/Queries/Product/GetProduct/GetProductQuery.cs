using EternalEchoesStore.Contracts.Responses;
using MediatR;

namespace EternalEchoesStore.Application.Queries.Product.GetProduct;

public record GetProductQuery():IRequest<GetProductResponse>;