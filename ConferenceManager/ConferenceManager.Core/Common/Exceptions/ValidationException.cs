using FluentValidation.Results;

namespace ConferenceManager.Core.Common.Exceptions
{
    public class ValidationException : Exception
    {
        public const string GenericMessage = "One or more validation failures have occurred";

        public IDictionary<string, string[]> Errors { get; }

        public ValidationException() : base(GenericMessage)
        {
            Errors = new Dictionary<string, string[]>();
        }

        public ValidationException(IEnumerable<ValidationFailure> failures) : this()
        {
            Errors = failures
                .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
                .ToDictionary(group => group.Key, group => group.ToArray());
        }
    }
}
