using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Infrastructure.Util;
using FluentValidation;
using Microsoft.Extensions.Options;

namespace ConferenceManager.Core.Conferences.Get
{
    public class GetConferenceQueryValidator : DbContextValidator<GetConferenceQuery>
    {
        public GetConferenceQueryValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IOptions<SeedSettings> settings) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
            RuleFor(x => x).CustomAsync(async (query, context, token) =>
            {
                var conference = await Context.Conferences.FindAsync(query.Id, token);

                if (conference == null || conference.Title == settings.Value.AdminConference)
                {
                    context.AddException(new NotFoundException("Conference not found"));
                }
            });
        }
    }
}
