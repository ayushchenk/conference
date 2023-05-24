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

        public bool HasAdminRole => Roles.Contains(ApplicationRole.Admin);

        public bool HasAuthorRole => Roles.Contains(ApplicationRole.Author);

        public bool HasReviewerRole => Roles.Contains(ApplicationRole.Reviewer);

        public bool IsParticipantOf(Conference conference)
        {
            return HasAdminRole || conference.Participants
                .Select(p => p.Id)
                .Contains(Id);
        }

        public bool IsAuthorOf(Submission submission)
        {
            return HasAdminRole || submission.CreatedById == Id;
        }

        public bool IsReviewerOf(Submission submission)
        {
            return HasAdminRole || submission.ActualReviewers
                .Select(r => r.Id)
                .Contains(Id);
        }
    }
}
