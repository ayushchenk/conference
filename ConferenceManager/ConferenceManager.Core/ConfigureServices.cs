﻿using CleanArchitecture.Application.Common.Behaviours;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using FluentValidation;

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

            //var mappers = Assembly.GetExecutingAssembly().GetTypes()
            //    .Where(type => type.GetInterface("IMapper`2") != null)
            //    .Select(type => new { Service = type.GetInterface("IMapper`2")!, Impl = type });

            //foreach(var mapper in mappers)
            //{
            //    services.Add(new ServiceDescriptor(mapper.Service, mapper.Impl, ServiceLifetime.Singleton));
            //}

            return services;
        }
    }
}
