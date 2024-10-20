using System.Reflection;
using EternalEchoesStore.Application.Behaviors;
using EternalEchoesStore.Application.Mappings;
using FluentValidation;
using Mapster;
using Microsoft.Extensions.DependencyInjection;

namespace EternalEchoesStore.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection service)
    {
        service.AddMediatR(cf =>
        {
            cf.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly());

           cf.AddOpenBehavior(typeof(ValidationBehaviors<,>));
        });
        
        MappingConfig.Configure();
        var config = TypeAdapterConfig.GlobalSettings;
        config.Scan(Assembly.GetExecutingAssembly());
        service.AddSingleton(config);

        service.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly()); 
        
        return service;
    }
}