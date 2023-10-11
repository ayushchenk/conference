using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Filters
{
    public class ConferenceAuthorizationAttribute : TypeFilterAttribute
    {
        public ConferenceAuthorizationAttribute(params string[] roles) : base(typeof(ConferenceAuthorizationFilter))
        {
            Arguments = new object[] { roles.Any() ? roles : ApplicationRole.AllRoles };
        }
    }
}
