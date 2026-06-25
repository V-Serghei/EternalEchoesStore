using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using EternalEchoesStore.Application.Commands.Users.CreateUser;
using EternalEchoesStore.Application.Helpers;
using EternalEchoesStore.Domain.Entities.UserDb;
using EternalEchoesStore.Domain.Enums.Role;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.Extensions.Configuration;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, string>
{
    private readonly UserDbContext _userDbContext;
    private readonly IConfiguration _configuration;
    private readonly GenerateJwtToken _generateJwtToken;

    public CreateUserCommandHandler(UserDbContext userDbContext, IConfiguration configuration)
    {
        _userDbContext = userDbContext;
        _configuration = configuration;
        _generateJwtToken = new GenerateJwtToken(_userDbContext, _configuration);
    }

    public async Task<string> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var user = new UserDb
        {
            Name = request.Name,
            Surname = request.Surname,
            Email = request.Email,
            Password = HashPassword(request.Password), 
            Photo = request.Photo,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Role = Role.Admin,
        };

        await _userDbContext.UserDb.AddAsync(user, cancellationToken);
        await _userDbContext.SaveChangesAsync(cancellationToken);

        return _generateJwtToken.GenerateJwtTokenHelpers(user);
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
}
