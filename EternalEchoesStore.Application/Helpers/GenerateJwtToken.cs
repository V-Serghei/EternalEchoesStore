using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EternalEchoesStore.Domain.Entities.UserDb;
using EternalEchoesStore.Domain.Enums.Role;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EternalEchoesStore.Application.Helpers;

public class GenerateJwtToken
{
    
    private readonly UserDbContext _userDbContext;
    private readonly IConfiguration _configuration;

    public GenerateJwtToken(UserDbContext userDbContext, IConfiguration configuration)
    {
        _userDbContext = userDbContext;
        _configuration = configuration;
    }

    protected internal string GenerateJwtTokenHelpers(UserDb user)
    {
        var role = user.Role == Role.Admin ? "Admin" : user.Role == Role.User ? "User" : "Guest";
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("Name", user.Name),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, role)
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
}