using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.GetParticipants
{
    public class GetConferenceParticipantsQueryValidator : DbContextValidator<GetConferenceParticipantsQuery>
    {
        public GetConferenceParticipantsQueryValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            Include(new EntityPageQueryValidator<UserDto>());

            RuleFor(x => x).CustomAsync(async (query, context, cancelToken) =>
            {
                var conference = await Context.Conferences.FindAsync(query.ConferenceId, cancelToken);

                if (conference == null)
                {
                    context.AddException(new NotFoundException("Conference not found"));
                }
            });
        }
    }
}
