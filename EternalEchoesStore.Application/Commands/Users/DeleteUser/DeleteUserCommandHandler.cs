using System.Threading;
using System.Threading.Tasks;
using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Domain.Entities.UserDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Commands.Users.DeleteUser;

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Unit>
{
    private readonly UserDbContext _userDbContext;

    public DeleteUserCommandHandler(UserDbContext userDbContext)
    {
        _userDbContext = userDbContext;
    }
    public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var userToDelete = await _userDbContext.UserDb
            .FirstOrDefaultAsync(x =>x.Id==request.Id, cancellationToken);
        if (userToDelete is null)
        {
            throw new NotFoundException($"{nameof(UserDb)} with {nameof(UserDb.Id)}: {request.Id}"
                                        + $" was not found in database");
        }

        _userDbContext.UserDb.Remove(userToDelete);
        
        await _userDbContext.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}