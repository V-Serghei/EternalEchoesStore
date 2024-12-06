using EternalEchoesStore.Contracts.Responses.UserResponses;
using MediatR;

namespace EternalEchoesStore.Application.Queries.Users.GetUser;

public record GetUsersQuery() : IRequest<GetUsersResponse>;