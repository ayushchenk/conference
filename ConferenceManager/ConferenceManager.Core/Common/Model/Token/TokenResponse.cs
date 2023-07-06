namespace ConferenceManager.Core.Common.Model.Token
{
    public class TokenResponse
    {
        public required string AccessToken { get; init; }

        public required IDictionary<int, string[]> Roles { get; init; }
    }
}
