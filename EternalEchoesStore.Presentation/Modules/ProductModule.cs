using EternalEchoesStore.Application.Commands.Product.CreateProduct;
using EternalEchoesStore.Application.Commands.Product.DeleteProduct;
using EternalEchoesStore.Application.Commands.Product.UpdateProduct;
using EternalEchoesStore.Application.Queries.Product.GetProduct;
using EternalEchoesStore.Application.Queries.Product.GetProductById;
using EternalEchoesStore.Contracts.Requests.Products;
using EternalEchoesStore.Contracts.Responses;
using MediatR;

namespace EternalEchoesStore.Presentation.Modules;

public static class ProductModule
{
    public static void AddProductEndpoints(this IEndpointRouteBuilder app)
    {

        app.MapGet("/api/products/", async (IMediator mediator, CancellationToken ct) =>
        {
            var products = await mediator.Send(new GetProductQuery(), ct);
            return Results.Ok(products);
        }).WithTags("Movies");

        app.MapGet("/api/products/{id}", async (IMediator mediator,int id, CancellationToken ct) =>
        {
            var products = await mediator.Send(new GetProductByIdQuery(id));
            return Results.Ok(products);
        }).WithTags("Products");
        
        app.MapPost("/app/products", async (IMediator mediator, CreateProductRequest createProductRequest,
            CancellationToken ct)=>
        {
            var command = new CreateProductCommand
            (
                createProductRequest.Title,
                createProductRequest.Description,
                createProductRequest.CreatedAt,
                createProductRequest.ImageUrl,
                createProductRequest.Category,
                createProductRequest.SubCategory
                
            );
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
        }).WithTags("Products");

        app.MapPut("/api/products/{id}",
            async (IMediator mediator, int id, UpdateProductRequest updateProductRequest, CancellationToken ct) =>
            {
                var command = new UpdateProductCommand
                (
                    id,
                    updateProductRequest.Title,
                    updateProductRequest.Description,
                    updateProductRequest.CreatedAt,
                    updateProductRequest.ImageUrl,
                    updateProductRequest.Category,
                    updateProductRequest.SubCategory

                );
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Products");
        
        app.MapDelete("/api/products/{id}", async (IMediator mediator, int id, CancellationToken ct) =>
        {
            var command = new DeleteProductCommand(id);
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
            
        }).WithTags("Products");
    }
}