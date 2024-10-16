using EternalEchoesStore.Contracts.Responses;
using MediatR;

namespace EternalEchoesStore.Application.Queries.Products.GetProducts;

public record GetProductsQuery():IRequest<GetProductsResponse>;