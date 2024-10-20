using EternalEchoesStore.Application.Commands.Products.CreateProduct;
using EternalEchoesStore.Application.Commands.Products.DeleteProduct;
using EternalEchoesStore.Application.Commands.Products.UpdateProduct;
using EternalEchoesStore.Application.Queries.Product.GetProductById;
using EternalEchoesStore.Application.Queries.Products.GetProducts;
using EternalEchoesStore.Contracts.Requests.Products;
using EternalEchoesStore.Contracts.Responses;
using MediatR;

namespace EternalEchoesStore.Presentation.Modules;

public static class ProductsModule
{
    public static void AddProductEndpoints(this IEndpointRouteBuilder app)
    {

        app.MapGet("/api/EternalEchoesStore/", async (IMediator mediator, CancellationToken ct) =>
        {
            var products = await mediator.Send(new GetProductsQuery(), ct);
            return Results.Ok(products);
        }).WithTags("Products");

        app.MapGet("/api/EternalEchoesStore/{id}", async (IMediator mediator,int id, CancellationToken ct) =>
        {
            var products = await mediator.Send(new GetProductByIdQuery(id), ct);
            return Results.Ok(products);
        }).WithTags("Products");
        
        app.MapPost("/api/EternalEchoesStore", async (IMediator mediator, CreateProductRequest createProductRequest,
            CancellationToken ct)=>
        {
            var command = new CreateProductCommand
            (
                createProductRequest.Title,
                createProductRequest.Description,
                createProductRequest.ImageUrl,
                createProductRequest.Category,
                createProductRequest.SubCategory
            );
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
        }).WithTags("Products");

        app.MapPut("/api/EternalEchoesStore/{id}",
            async (IMediator mediator, int id, UpdateProductRequest updateProductRequest, CancellationToken ct) =>
            {
                var command = new UpdateProductCommand
                (
                    id,
                    updateProductRequest.Title,
                    updateProductRequest.Description,
                    updateProductRequest.ImageUrl,
                    updateProductRequest.Category,
                    updateProductRequest.SubCategory

                );
                var result = await mediator.Send(command, ct);
                return Results.Ok(result);
            }).WithTags("Products");
        
        app.MapDelete("/api/EternalEchoesStore/{id}", async (IMediator mediator, int id, CancellationToken ct) =>
        {
            var command = new DeleteProductCommand(id);
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
            
        }).WithTags("Products");
    }
}