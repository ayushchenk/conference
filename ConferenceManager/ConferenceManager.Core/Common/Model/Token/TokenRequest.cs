using ConferenceManager.Core.Account.Login;

namespace ConferenceManager.Core.Common.Model.Token
{
    public class TokenRequest
    {
        public required string Email { get; init; }

        public required string Password { get; init; }
    }
}
