using System;
using System.Threading;
using System.Threading.Tasks;
using EternalEchoesStore.Application.Helpers;
using EternalEchoesStore.Domain.Entities.UserDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace EternalEchoesStore.Application.Commands.Users.VerificationUser;

public class VerificationUserCommandHandler : IRequestHandler<VerificationUserCommand, string>
{
    private readonly UserDbContext _userDbContext;
    private readonly IConfiguration _configuration;
    private readonly GenerateJwtToken _generateJwtToken;

    public VerificationUserCommandHandler(UserDbContext userDbContext, IConfiguration configuration)
    {
        _userDbContext = userDbContext;
        _configuration = configuration;
        _generateJwtToken = new GenerateJwtToken(_userDbContext, _configuration);
    }
    public async Task<string> Handle(VerificationUserCommand request, CancellationToken cancellationToken)
    {
        var userToVerify = await _userDbContext.UserDb
            .FirstOrDefaultAsync(x =>x.Email==request.Email &&
                                     x.Password == HashPassword(request.Password), cancellationToken);
        if (userToVerify is null)
        {
            throw new ArgumentException($"{nameof(UserDb)} with {nameof(UserDb.Id)}: {request.Email}"
                                        + $" was not found in database");
        }
        
        var token = _generateJwtToken.GenerateJwtTokenHelpers(userToVerify);
        var session = new UserSession
        {
            UserId = userToVerify.Id,
            JwtToken = token,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        await _userDbContext.UserSessions.AddAsync(session, cancellationToken);
        await _userDbContext.SaveChangesAsync(cancellationToken);

        return token;
        
    }
    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
}