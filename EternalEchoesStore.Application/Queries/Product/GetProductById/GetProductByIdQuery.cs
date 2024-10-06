using EternalEchoesStore.Contracts.Responses;
using MediatR;

namespace EternalEchoesStore.Application.Queries.Product.GetProductById;

public record GetProductByIdQuery(int Id):IRequest<GetProductByIdRespons>;