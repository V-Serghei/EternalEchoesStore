using EternalEchoesStore.Application;
using EternalEchoesStore.Infrastructure.DbContextInfrastructure;
using EternalEchoesStore.Presentation.Handlers;
using EternalEchoesStore.Presentation.Middlewares;
using EternalEchoesStore.Presentation.Modules;
using Microsoft.EntityFrameworkCore;

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

app.UseMiddleware<JwtMiddleware>();


app.Run();