using ConferenceManager.Domain.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Common.Interfaces
{
    public interface ICurrentUserService
    {
        int Id { get; }

        bool IsAdmin { get; }

        bool IsAuthorIn(Conference conference);

        bool IsReviewerIn(Conference conference);

        bool IsChairIn(Conference conference);

        bool IsParticipantOf(Conference conference);

        bool IsAuthorOf(BaseAuditableEntity entity);

        bool IsReviewerOf(Submission submission);

        bool HasRoleIn(Conference conference, string role);
    }
}
