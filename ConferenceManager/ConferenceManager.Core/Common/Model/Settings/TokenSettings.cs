namespace ConferenceManager.Core.Common.Model.Settings
{
    public class TokenSettings
    {
        public string Issuer { get; init; } = null!;

        public string Audience { get; init; } = null!;

        public string Key { get; init; } = null!;

        public int ExpiresMinutes { get; init; }
    }
}
