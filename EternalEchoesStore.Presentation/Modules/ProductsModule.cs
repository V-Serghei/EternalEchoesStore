using EternalEchoesStore.Application.Commands.Products.CreateProduct;
using EternalEchoesStore.Application.Commands.Products.DeleteProduct;
using EternalEchoesStore.Application.Commands.Products.RatingProduct;
using EternalEchoesStore.Application.Commands.Products.UpdateProduct;
using EternalEchoesStore.Application.Queries.Product.GetProductById;
using EternalEchoesStore.Application.Queries.Products.GetProducts;
using EternalEchoesStore.Contracts.Requests.Products;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace EternalEchoesStore.Presentation.Modules;

public static class ProductsModule
{
    public static void AddProductEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/EternalEchoesStore/product/", [Authorize(Policy = "GuestOnly")] async (IMediator mediator, CancellationToken ct) =>
        {
            var products = await mediator.Send(new GetProductsQuery(), ct);
            return Results.Ok(products);
        }).WithTags("Products");

        app.MapGet("/api/EternalEchoesStore/product/{id}", [Authorize(Policy = "GuestOnly")] async (IMediator mediator, int id, CancellationToken ct) =>
        {
            var products = await mediator.Send(new GetProductByIdQuery(id), ct);
            return Results.Ok(products);
        }).WithTags("Products");

        app.MapPost("/api/EternalEchoesStore/product", [Authorize(Policy = "UserOnly")] async (IMediator mediator, CreateProductRequest createProductRequest, CancellationToken ct) =>
        {
            var command = new CreateProductCommand
            (
                createProductRequest.Title,
                createProductRequest.Description,
                createProductRequest.ImageUrl,
                createProductRequest.Category,
                createProductRequest.SubCategory,
                createProductRequest.Price,
                createProductRequest.Quantity,
                createProductRequest.Rating,
                createProductRequest.SubSubCategory,
                createProductRequest.IsAvailable,
                createProductRequest.Discount,
                createProductRequest.SKU
            );
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
        }).WithTags("Products");

        app.MapPut("/api/EternalEchoesStore/product/{id}", [Authorize(Policy = "UserOnly")] async (IMediator mediator, int id, UpdateProductRequest updateProductRequest, CancellationToken ct) =>
        {
            var command = new UpdateProductCommand
            (
                id,
                updateProductRequest.Title,
                updateProductRequest.Description,
                updateProductRequest.ImageUrl,
                updateProductRequest.Category,
                updateProductRequest.SubCategory,
                updateProductRequest.Price,
                updateProductRequest.Quantity,
                updateProductRequest.Rating,
                updateProductRequest.SubSubCategory,
                updateProductRequest.IsAvailable,
                updateProductRequest.Discount,
                updateProductRequest.SKU
                
            );
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
        }).WithTags("Products");

        app.MapDelete("/api/EternalEchoesStore/product/{id}", [Authorize(Policy = "UserOnly")] async (IMediator mediator, int id, CancellationToken ct) =>
        {
            var command = new DeleteProductCommand(id);
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
        }).WithTags("Products");

        app.MapPost("/api/EternalEchoesStore/product/{id}/rating", [Authorize(Policy = "UserOnly")] async (IMediator mediator, int id, int rating, CancellationToken ct) =>
        {
            var command = new UpdateProductRatingCommand(id, rating);
            var result = await mediator.Send(command, ct);
            return Results.Ok(result);
        }).WithTags("Products");
    }
}
