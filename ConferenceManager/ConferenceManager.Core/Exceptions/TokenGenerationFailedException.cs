namespace ConferenceManager.Core.Exceptions
{
    public class TokenGenerationFailedException : IdentityException
    {
        private const string Description = "Token generation failed";

        public TokenGenerationFailedException() : base(Description)
        {            
        }
    }
}
