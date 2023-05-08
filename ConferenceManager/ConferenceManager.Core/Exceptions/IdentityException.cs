using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.Exceptions
{
    public class IdentityException : Exception
    {
        public IEnumerable<IdentityError> Errors { get; }

        public string Summary => string.Join("; ", Errors.Select(e => e.Description));

        public IdentityException(IEnumerable<IdentityError> errors)
        {
            Errors = errors;
        }

        public IdentityException(string message) : base(message)
        {
            Errors = new IdentityError[]
            {
                new IdentityError(){ Description = message }
            };
        }
    }
}
