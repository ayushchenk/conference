using ConferenceManager.Core.Common.Interfaces;
using FluentValidation;

namespace ConferenceManager.Core.Common.Validators
{
    public abstract class DbContextValidator<TModel> : BaseValidator<TModel>
    {
        protected IApplicationDbContext Context { get; }

        protected ICurrentUserService CurrentUser { get; }

        protected DbContextValidator(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            Context = context;
            CurrentUser = currentUser;
            ClassLevelCascadeMode = CascadeMode.Stop;
        }
    }
}
