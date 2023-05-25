using FluentValidation;
using FluentValidation.Results;

namespace ConferenceManager.Core.Common.Extensions
{
    public static class ValidationContextExtensions
    {
        public static void AddException<T>(this ValidationContext<T> context, Exception exception)
        {
            context.AddFailure(new ValidationFailure()
            {
                CustomState = exception
            });
        }
    }
}
