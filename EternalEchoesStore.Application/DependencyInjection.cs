using System.Reflection;
using EternalEchoesStore.Application.Mappings;
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
        });
        
        MappingConfig.Configure();
        var config = TypeAdapterConfig.GlobalSettings;
        config.Scan(Assembly.GetExecutingAssembly());
        service.AddSingleton(config);

        return service;
    }
}