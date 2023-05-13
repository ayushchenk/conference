namespace ConferenceManager.Core.Common.Interfaces
{
    public interface ICurrentUserService
    {
        int Id { get; }

        string[] Roles { get; }

        bool IsGlobalAdmin { get; }
    }
}
