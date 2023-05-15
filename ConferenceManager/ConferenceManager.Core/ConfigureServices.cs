using CleanArchitecture.Application.Common.Behaviours;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using FluentValidation;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Create;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Core.Account.Register;
using ConferenceManager.Core.Conferences.Create;

namespace ConferenceManager.Core
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly());
                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
                cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(PerformanceBehavior<,>));
            });

            services.AddTransient<IMapper<CreateSubmissionCommand, Submission>, CreateSubmissionCommandMapper>();
            services.AddTransient<IMapper<CreateConferenceCommand, Conference>, CreateConferenceCommandMapper>();
            services.AddTransient<IMapper<RegisterUserCommand, ApplicationUser>, RegisterUserCommandMapper>();

            return services;
        }
    }
}
