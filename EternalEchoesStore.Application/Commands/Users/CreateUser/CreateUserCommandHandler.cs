using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EternalEchoesStore.Application.Commands.Users.CreateUser;
using EternalEchoesStore.Domain.Entities.UserDb;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using MediatR;
using Microsoft.Extensions.Configuration;

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, string>
{
    private readonly UserDbContext _userDbContext;
    private readonly IConfiguration _configuration;

    public CreateUserCommandHandler(UserDbContext userDbContext, IConfiguration configuration)
    {
        _userDbContext = userDbContext;
        _configuration = configuration;
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
            CreatedAt = DateTime.UtcNow
        };

        await _userDbContext.UserDb.AddAsync(user, cancellationToken);
        await _userDbContext.SaveChangesAsync(cancellationToken);

        return GenerateJwtToken(user);
    }

    private string GenerateJwtToken(UserDb user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("Name", user.Name),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7), 
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }
}
