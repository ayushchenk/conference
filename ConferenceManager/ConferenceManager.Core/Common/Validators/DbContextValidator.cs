using ConferenceManager.Core.Common.Interfaces;
using FluentValidation;
using System.Linq.Expressions;

namespace ConferenceManager.Core.Common.Validators
{
    public abstract class DbContextValidator<T> : AbstractValidator<T>
    {
        protected IApplicationDbContext Context { get; }

        protected ICurrentUserService CurrentUser { get; }

        protected DbContextValidator(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            Context = context;
            CurrentUser = currentUser;
            ClassLevelCascadeMode = CascadeMode.Stop;
        }

        public void RuleForId(Expression<Func<T, int>> expression)
        {
            RuleFor(expression)
                .GreaterThan(0).WithMessage($"{GetPropertyName(expression)} is required");
        }

        private string GetPropertyName(Expression<Func<T, int>> expression)
        {
            return (expression.Body as MemberExpression)?.Member?.Name ?? "Parameter";
        }
    }
}
