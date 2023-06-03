using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace ConferenceManager.Api.Filters
{
    public class SwaggerRolesFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            var roles = context.MethodInfo.
                 GetCustomAttributes(true)
                 .OfType<AuthorizeAttribute>()
                 .Select(a => a.Roles)
                 .Distinct()
                 .ToArray();

            if (roles.Any())
            {
                string joinedRoles = roles.Any(r => !string.IsNullOrEmpty(r))
                    ? $" [{string.Join(",", roles)}]"
                    : " [Any role]";

                operation.Summary += joinedRoles;
            }
        }
    }
}
