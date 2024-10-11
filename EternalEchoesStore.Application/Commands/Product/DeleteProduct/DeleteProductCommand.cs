using MediatR;

namespace EternalEchoesStore.Application.Commands.Product.DeleteProduct;

public record DeleteProductCommand(int Id):IRequest<Unit>;