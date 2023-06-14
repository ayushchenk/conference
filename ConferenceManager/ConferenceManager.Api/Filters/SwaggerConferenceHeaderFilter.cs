using ConferenceManager.Api.Util;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ConferenceManager.Api.Filters
{
    public class SwaggerConferenceHeaderFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var conferenceAttr = context.MethodInfo
                .GetCustomAttributes(true)
                .OfType<ConferenceAuthorizationAttribute>();

            if (conferenceAttr.Any())
            {
                operation.Summary += $" [{Headers.ConferenceId}]";
                operation.Parameters ??= new List<OpenApiParameter>();

                if (!operation.Parameters.Any(p => p.Name == Headers.ConferenceId))
                {
                    operation.Parameters.Insert(0, new OpenApiParameter
                    {
                        Name = Headers.ConferenceId,
                        In = ParameterLocation.Header,
                        Required = true
                    });
                }
            }
        }
    }
}
