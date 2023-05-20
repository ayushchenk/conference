using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using System.Security.Claims;

namespace ConferenceManager.Api.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int Id
        {
            get
            {
                var idClaim = _httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);

                var parseResult = int.TryParse(idClaim, out int id);

                return parseResult ? id : default;
            }
        }

        public string[] Roles
        {
            get
            {
                var roleClaims = _httpContextAccessor.HttpContext?.User?.Claims?.Where(claim => claim.Type == ClaimTypes.Role);

                return roleClaims == null
                    ? Array.Empty<string>()
                    : roleClaims.Select(claim => claim.Value).ToArray();
            }
        }

        public bool IsGlobalAdmin => Roles.Contains(ApplicationRole.GlobalAdmin);

        public bool IsConferenceAdmin => Roles.Contains(ApplicationRole.ConferenceAdmin);

        public bool IsAuthor => Roles.Contains(ApplicationRole.Author);

        public bool IsReviewer => Roles.Contains(ApplicationRole.Reviwer);
    }
}
