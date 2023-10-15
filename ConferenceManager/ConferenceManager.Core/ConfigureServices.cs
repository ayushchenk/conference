using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using FluentValidation;
using CleanArchitecture.Application.Common.Behaviors;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Util;

namespace ConferenceManager.Core
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(PerformanceBehavior<,>));
            });

            var mappers = typeof(IMapper<,>).Assembly.GetTypes()
                .Where(type => type.GetInterface("IMapper`2") != null)
                .Select(type =>
                {
                    var service = type.GetInterface("IMapper`2")!;
                    var source = service.GenericTypeArguments.First();
                    var destination = service.GenericTypeArguments.Last();
                    return new MapperDescription()
                    {
                        Service = service,
                        Implementation = type,
                        Source = source,
                        Destination = destination
                    };
                }).ToList();

            foreach (var mapper in mappers)
            {
                services.Add(new ServiceDescriptor(mapper.Service, mapper.Implementation, ServiceLifetime.Scoped));
            }

            services.AddSingleton<List<MapperDescription>>(mappers);
            services.AddSingleton<IMappingHost, MappingHost>();

            return services;
        }
    }
}
