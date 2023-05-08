using Newtonsoft.Json;

namespace ConferenceManager.Core.Common.Model.Token
{
    public class Token
    {
        [JsonProperty("secret")]
        public required DateTime Issued { get; init; }

        [JsonProperty("issuer")]
        public required DateTime Expiry { get; init; }

        [JsonProperty("access_token")]
        public required string AccessToken { get; init; }
    }
}
