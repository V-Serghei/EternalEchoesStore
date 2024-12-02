using EternalEchoesStore.Application.Commands.Users.CreateUser;
using EternalEchoesStore.Application.Commands.Users.DeleteUser;
using EternalEchoesStore.Application.Commands.Users.UpdateUser;
using EternalEchoesStore.Application.Commands.Users.VerificationUser;
using EternalEchoesStore.Application.Queries.Users.GetUser;
using EternalEchoesStore.Application.Queries.Users.GetUserById;
using EternalEchoesStore.Contracts.Requests.Users;
using MediatR;

namespace EternalEchoesStore.Presentation.Modules;

public static class UsersModule
{
    public static void AddUsersEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/EternalEchoesStore/user/", async (IMediator mediator, CancellationToken ct) =>
        {
            var users = await mediator.Send(new GetUsersQuery(), ct);
            return Results.Ok(users);
        }).WithTags("Users");
        
        app.MapGet("/api/EternalEchoesStore/user/{id}", async (IMediator mediator,int id, CancellationToken ct) =>
        {
            var users = await mediator.Send(new GetUserByIdQuery(id), ct);
            return Results.Ok(users);
        }).WithTags("Users");
        
        app.MapPost("/api/EternalEchoesStore/user", async (IMediator mediator
            , CreateUserRequest createUserRequest, CancellationToken ct)=>
        {
            var command = new CreateUserCommand
            (
                createUserRequest.Name,
                createUserRequest.Surname,
                createUserRequest.Email,
                createUserRequest.Password,
                createUserRequest.Photo
            );
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
        }).WithTags("Users");
        
        app.MapPut("/api/EternalEchoesStore/user/{id}",
            async (IMediator mediator, int id, UpdateUserRequest updateUserRequest
                , CancellationToken ct) =>
            {
                var command = new UpdateUserCommand
                (
                    id,
                    updateUserRequest.Name,
                    updateUserRequest.Surname,
                    updateUserRequest.Email,
                    updateUserRequest.Password,
                    updateUserRequest.Photo
                );
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Users");
        
        app.MapDelete("/api/EternalEchoesStore/user/{id}", async (IMediator mediator, int id, CancellationToken ct) =>
        {
            var command = new DeleteUserCommand(id);
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
            
        }).WithTags("Users");
        
        app.MapPut("/api/EternalEchoesStore/user/",
            async (IMediator mediator, VerificationUserRequest verificationUserRequest, 
                CancellationToken ct) =>
            {
                var command = new VerificationUserCommand
                (
                    verificationUserRequest.Email,
                    verificationUserRequest.Password
                );
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Users");
    }
}