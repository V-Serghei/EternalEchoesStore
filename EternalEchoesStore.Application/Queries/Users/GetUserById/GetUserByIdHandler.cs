using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Contracts.Responses.UserResponses;
using EternalEchoesStore.Domain.Entities.UserDb;
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
        var user = await _userDbContext.UserDb
            .FirstOrDefaultAsync(x=>x.Id==request.Id, cancellationToken);
        if (user is null)
        {
            throw new NotFoundException($"{nameof(UserDb)} with {nameof(UserDb.Id)}: {request.Id}"
                + $" was not found in database");
        }

        return user.Adapt<GetUserByIdResponse>();
    }
}