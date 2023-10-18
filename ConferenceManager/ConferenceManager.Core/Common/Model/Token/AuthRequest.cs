namespace ConferenceManager.Core.Common.Model.Token
{
    public class AuthRequest
    {
        public required string Email { get; init; }

        public required string Password { get; init; }
    }
}
