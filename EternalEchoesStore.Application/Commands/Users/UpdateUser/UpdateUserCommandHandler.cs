using EternalEchoesStore.Contracts.Exceptions;
using EternalEchoesStore.Domain.Entities.UserDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EternalEchoesStore.Application.Commands.Users.UpdateUser;

public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, Unit>
{
    private readonly UserDbContext _userDbContext;

    public UpdateUserCommandHandler(UserDbContext userDbContext)
    {
        _userDbContext = userDbContext;
    }
    public async Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var userToUpdate = await _userDbContext.Users
            .FirstOrDefaultAsync(x =>x.Id==request.Id, cancellationToken);
        if (userToUpdate is null)
        {
            throw new ArgumentException($"{nameof(UserDb)} with {nameof(UserDb.Id)}: {request.Id}"
                                        + $" was not found in database");
        }

        userToUpdate.Name = request.Name;
        userToUpdate.Surname = request.Surname;
        userToUpdate.Email = request.Email;
        userToUpdate.Password = request.Password;
        userToUpdate.Photo = request.Photo;
        
        _userDbContext.Users.Update(userToUpdate);
        
        await _userDbContext.SaveChangesAsync(cancellationToken);
        
        return Unit.Value;
    }
}