using MediatR;

namespace EternalEchoesStore.Application.Commands.Products.DeleteProduct;

public record DeleteProductCommand(int Id):IRequest<Unit>;