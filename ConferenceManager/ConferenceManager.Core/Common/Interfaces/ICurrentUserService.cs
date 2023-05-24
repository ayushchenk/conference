using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Common.Interfaces
{
    public interface ICurrentUserService
    {
        int Id { get; }

        string[] Roles { get; }

        bool HasAdminRole { get; }

        bool HasAuthorRole { get; }

        bool HasReviewerRole { get; }

        bool IsParticipantOf(Conference conference);

        bool IsAuthorOf(Submission submission);

        bool IsReviewerOf(Submission submission);
    }
}
