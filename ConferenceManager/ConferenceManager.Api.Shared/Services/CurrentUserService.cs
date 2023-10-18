using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Common;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Immutable;
using System.Security.Claims;

namespace ConferenceManager.Api.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        private int[]? _participations;
        private IDictionary<int, string[]>? _roles;

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

        public int[] Participations
        {
            get
            {
                var participationsJson = _httpContextAccessor.HttpContext?.User?.FindFirstValue("conference_participations");

                if (string.IsNullOrEmpty(participationsJson))
                {
                    return Array.Empty<int>();
                }

                return _participations ??= JsonConvert.DeserializeObject<int[]>(participationsJson) ?? Array.Empty<int>();
            }
        }

        public IDictionary<int, string[]> Roles
        {
            get
            {
                var rolesJson = _httpContextAccessor.HttpContext?.User?.FindFirstValue("conference_roles");

                if (string.IsNullOrEmpty(rolesJson))
                {
                    return ImmutableDictionary<int, string[]>.Empty;
                }

                return _roles ??= JsonConvert.DeserializeObject<IDictionary<int, string[]>>(rolesJson) ?? ImmutableDictionary<int, string[]>.Empty;
            }
        }

        public bool IsAdmin => _httpContextAccessor.HttpContext?.User?.IsInRole(ApplicationRole.Admin) ?? false;

        public bool HasRoleIn(Conference conference, string role)
        {
            return Roles.Any(kv => kv.Key == conference.Id && kv.Value.Contains(role));
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
            return Participations.Contains(conference.Id);
        }

        public bool IsAuthorOf(BaseAuditableEntity entity)
        {
            return entity.CreatedById == Id;
        }

        public bool IsReviewerOf(Submission submission)
        {
            return submission.ActualReviewers.Any(r => r.Id == Id);
        }
    }
}
