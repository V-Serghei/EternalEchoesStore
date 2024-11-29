using EternalEchoesStore.Domain.Entities.UserDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Mapster;
using MediatR;

namespace EternalEchoesStore.Application.Commands.Users.CreateUser;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, int>
{
    private readonly UserDbContext _userDbContext;

    public CreateUserCommandHandler(UserDbContext userDbContext)
    {
        _userDbContext = userDbContext;
    }
    public async Task<int> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new UserDb
        {
            Name = request.Name,
            Surname = request.Surname,
            Email = request.Email,
            Password = request.Password,
            Photo = request.Photo,
            CreatedAt = DateTime.Now.ToUniversalTime()
        };
        await _userDbContext.UserDb.AddAsync(user, cancellationToken);
        await _userDbContext.SaveChangesAsync(cancellationToken);
        return user.Id;
    }
}