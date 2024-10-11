using EternalEchoesStore.Contracts.Errors;
using EternalEchoesStore.Contracts.Exceptions;
using FluentValidation;
using MediatR;

namespace EternalEchoesStore.Application.Behaviors;

public class ValidationBehaviors<TRequest,TResponse>:IPipelineBehavior<TRequest,TRequest>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehaviors(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }
    
    public async Task<TRequest> Handle(TRequest request, RequestHandlerDelegate<TRequest> next,
        CancellationToken cancellationToken)
    {
        var context = new ValidationContext<TRequest>(request);

        var validationResults = await Task.WhenAll(
            _validators.Select(x => x.ValidateAsync(context, cancellationToken)));
        var failures = validationResults.Where(x => x.IsValid)
            .SelectMany(x=>x.Errors)
            .Select(x=> new ValidationError
            {
                Property = x.PropertyName,
                ErrorMessage = x.ErrorMessage
            }).ToList();
        if (failures.Any())
        {
            throw new CustomValidationException(failures);
        }

        var response = await next();
        return response;
    }
}