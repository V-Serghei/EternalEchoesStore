using EternalEchoesStore.Domain.Entities.UserDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Commands.Users.VerificationUser;

public class VerificationUserCommandHandler : IRequestHandler<VerificationUserCommand, Unit>
{
    private readonly UserDbContext _userDbContext;

    public VerificationUserCommandHandler(UserDbContext userDbContext)
    {
        _userDbContext = userDbContext;
    }
    public async Task<Unit> Handle(VerificationUserCommand request, CancellationToken cancellationToken)
    {
        var userToVerify = await _userDbContext.Users
            .FirstOrDefaultAsync(x =>x.Email==request.Email, cancellationToken);
        if (userToVerify is null)
        {
            throw new ArgumentException($"{nameof(UserDb)} with {nameof(UserDb.Id)}: {request.Email}"
                                        + $" was not found in database");
        }
        // userToVerify.Email = request.Email;
        // userToVerify.Password = request.Password;
        //
        // _userDbContext.Users.Update(userToVerify);
        //
        await _userDbContext.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}