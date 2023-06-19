namespace ConferenceManager.Core.Common.Model.Token
{
    public class TokenResponse
    {
        public required Token Token { get; init; }

        public required int UserId { get; init; }

        public required string Email { get; init; }

        public required bool IsAdmin { get; init; }

        public required IDictionary<int, string[]> Roles { get; init; }
    }
}
