namespace ConferenceManager.Core.Common.Model.Token
{
    public class TokenResponse
    {
        public required Token Token { get; init; }

        public required int UserId { get; init; }

        public required string Email { get; init; }

        public required IEnumerable<string> Roles { get; init; }
    }
}
