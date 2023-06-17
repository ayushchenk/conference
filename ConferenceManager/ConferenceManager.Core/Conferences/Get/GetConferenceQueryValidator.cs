using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.Get
{
    public class GetConferenceQueryValidator : DbContextValidator<GetConferenceQuery>
    {
        public GetConferenceQueryValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
            RuleFor(x => x).CustomAsync(async (query, context, token) =>
            {
                var conference = await Context.Conferences.FindAsync(query.Id, token);

                if (conference == null)
                {
                    context.AddException(new NotFoundException("Conference not found"));
                }
            });
        }
    }
}
