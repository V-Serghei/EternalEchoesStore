using System.Text;
using EternalEchoesStore.Application;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using EternalEchoesStore.Presentation.Handlers;
using EternalEchoesStore.Presentation.Middlewares;
using EternalEchoesStore.Presentation.Modules;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ProductDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnectionString"));
});
builder.Services.AddDbContext<UserDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnectionString"));
});
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("CorsPolicy", policyBuilder =>
    {
        policyBuilder.WithOrigins("http://localhost:3000") 
            .AllowAnyMethod()
            .AllowAnyHeader(); 
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? string.Empty))
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("GuestOnly", policy => policy.RequireRole("Guest", "User", "Admin"));

    options.AddPolicy("UserOnly", policy => policy.RequireRole("User", "Admin"));

    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});


builder.Services.AddApplication();
builder.Services.AddExceptionHandler<ExceptionHandler>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler(_ => { });
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();
app.AddProductEndpoints();
app.AddUsersEndpoints();
app.UseAuthentication(); 
app.UseAuthorization();
app.UseMiddleware<JwtMiddleware>();


app.Run();