using EternalEchoesStore.Contracts.Responses.UserResponses;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Queries.Users.GetUserById;

public class GetUserByIdHandler : IRequestHandler<GetUserByIdQuery, GetUserByIdResponse>
{
    private readonly UserDbContext _userDbContext;

    public GetUserByIdHandler(UserDbContext userDbContext)
    {
        _userDbContext = userDbContext;
    }
    public async Task<GetUserByIdResponse> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await _userDbContext.Users
            .FirstOrDefaultAsync(x=>x.Id==request.Id, cancellationToken);
        if (user is null)
        {
            throw new Exception();
        }

        return user.Adapt<GetUserByIdResponse>();
    }
}