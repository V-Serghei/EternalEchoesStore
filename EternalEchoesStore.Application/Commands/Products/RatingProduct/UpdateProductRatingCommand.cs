using MediatR;

namespace EternalEchoesStore.Application.Commands.Products.RatingProduct;

public record UpdateProductRatingCommand(int Id, int Rating):IRequest<Unit>;
