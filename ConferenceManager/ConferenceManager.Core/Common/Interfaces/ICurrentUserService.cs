namespace ConferenceManager.Core.Common.Interfaces
{
    public interface ICurrentUserService
    {
        int Id { get; }

        string[] Roles { get; }

        bool IsGlobalAdmin { get; }

        bool IsConferenceAdmin { get; }

        bool IsAuthor { get; }

        bool IsReviewer { get; }
    }
}
