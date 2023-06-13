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

                operation.Parameters.Add(new OpenApiParameter
                {
                    Name = Headers.ConferenceId,
                    In = ParameterLocation.Header,
                    Required = true
                });
            }
        }
    }
}
