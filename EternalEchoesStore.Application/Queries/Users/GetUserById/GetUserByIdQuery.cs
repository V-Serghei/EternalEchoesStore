using EternalEchoesStore.Contracts.Responses.UserResponses;
using MediatR;

namespace EternalEchoesStore.Application.Queries.Users.GetUserById;

public record GetUserByIdQuery(int Id) : IRequest<GetUserByIdResponse>;