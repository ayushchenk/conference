using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ConferenceManager.Api.Filters
{
    public class ConferenceAuthorizationAttribute : TypeFilterAttribute
    {
        private static readonly string[] AllRoles = new string[]
        {
            ApplicationRole.Admin, ApplicationRole.Chair, ApplicationRole.Reviewer, ApplicationRole.Author
        };

        public ConferenceAuthorizationAttribute(params string[] roles) : base(typeof(ConferenceAuthorizationFilter))
        {
            Arguments = new object[] { roles.Any() ? roles : AllRoles };
        }
    }
}
