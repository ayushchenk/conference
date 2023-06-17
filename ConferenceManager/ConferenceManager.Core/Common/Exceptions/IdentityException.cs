using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.Common.Exceptions
{
    public class IdentityException : Exception
    {
        public IEnumerable<IdentityError> IdentityErrors { get; }

        public IDictionary<string, string[]> Errors =>
            IdentityErrors.ToDictionary(error => error.Code, error => new string[] { error.Description });

        public IdentityException(IEnumerable<IdentityError> errors)
        {
            IdentityErrors = errors;
        }

        public IdentityException(string message) : base(message)
        {
            IdentityErrors = new IdentityError[]
            {
                new IdentityError()
                {
                    Description = message,
                    Code = "Identity"
                }
            };
        }
    }
}
