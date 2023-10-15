using FluentValidation;
using System.Linq.Expressions;

namespace ConferenceManager.Core.Common.Validators
{
    public class BaseValidator<TModel> : AbstractValidator<TModel>
    {
        public IRuleBuilderOptions<TModel, int> RuleForId(Expression<Func<TModel, int>> expression)
        {
            return RuleFor(expression)
                .GreaterThan(0)
                .WithMessage($"{GetPropertyName(expression)} is required");
        }

        public IRuleBuilderOptions<TModel, string?> RuleForString(Expression<Func<TModel, string?>> expression, int length, bool required)
        {
            var rule = RuleFor(expression)
                .MaximumLength(length)
                .WithMessage($"Maximum length for {GetPropertyName(expression)} is {length}");

            if (required)
            {
                rule.NotEmpty().WithMessage($"{GetPropertyName(expression)} is required");
            }

            return rule;
        }

        public IRuleBuilderOptions<TModel, TType> RuleForArray<TType>(Expression<Func<TModel, TType>> expression, TType[] values)
        {
            return RuleFor(expression)
                .Must(x => values.Contains(x)).WithMessage($"Value is not supported");
        }

        private string GetPropertyName<TType>(Expression<Func<TModel, TType>> expression)
        {
            return (expression.Body as MemberExpression)?.Member?.Name ?? "Parameter";
        }
    }
}
