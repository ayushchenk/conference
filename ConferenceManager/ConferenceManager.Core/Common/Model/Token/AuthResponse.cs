namespace ConferenceManager.Core.Common.Model.Token
{
    public class AuthResponse
    {
        public required int Id { get; init; }

        public required bool Admin { get; init; }

        public required DateTime ValidTo { get; init; }

        public required IDictionary<int, string[]> Roles { get; init; }
    }
}
