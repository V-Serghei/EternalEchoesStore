using EternalEchoesStore.Contracts.Responses.UserResponses;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Queries.Users.GetUser;

public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, GetUsersResponse>
{
    private readonly UserDbContext _userDbContext;

    public GetUsersQueryHandler(UserDbContext userDbContext)
    {
        _userDbContext = userDbContext;
    }
    public async Task<GetUsersResponse> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        var users = await _userDbContext.Users.ToListAsync(cancellationToken);
        return users.Adapt<GetUsersResponse>();
    }
}