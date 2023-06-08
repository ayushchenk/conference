using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.User.Get
{
    public class GetUserQueryValidator : DbContextValidator<GetUserQuery>
    {
        public GetUserQueryValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
            RuleFor(x => x).CustomAsync(async (query, context, token) =>
            {
                var user = await Context.Users.FindAsync(query.Id, token);

                if (user == null)
                {
                    context.AddException(new NotFoundException("User not found"));
                    return;
                }

                if (!CurrentUser.HasAdminRole && CurrentUser.Id != user.Id)
                {
                    context.AddException(new ForbiddenException("Can only query self"));
                }
            });
        }
    }
}
