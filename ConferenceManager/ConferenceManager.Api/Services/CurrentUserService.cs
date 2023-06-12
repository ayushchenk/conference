using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Common;
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

        public bool IsAdmin => _httpContextAccessor.HttpContext?.User?.IsInRole(ApplicationRole.Admin) ?? false;

        public bool HasRoleIn(Conference conference, string role)
        {
            return conference.UserRoles
                .Any(r => r.UserId == Id && r.Role.Name == role);
        }

        public bool IsAuthorIn(Conference conference)
        {
            return HasRoleIn(conference, ApplicationRole.Author);
        }

        public bool IsReviewerIn(Conference conference)
        {
            return HasRoleIn(conference, ApplicationRole.Reviewer);
        }

        public bool IsChairIn(Conference conference)
        {
            return HasRoleIn(conference, ApplicationRole.Chair);
        }

        public bool IsParticipantOf(Conference conference)
        {
            return conference.Participants
                .Select(p => p.Id)
                .Contains(Id);
        }

        public bool IsAuthorOf(BaseAuditableEntity entity)
        {
            return entity.CreatedById == Id;
        }

        public bool IsReviewerOf(Submission submission)
        {
            return submission.ActualReviewers
                .Select(r => r.Id)
                .Contains(Id);
        }
    }
}
