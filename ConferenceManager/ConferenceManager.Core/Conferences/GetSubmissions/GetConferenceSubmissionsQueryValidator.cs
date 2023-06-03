using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Submissions.Common;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.GetSubmissions
{
    public class GetConferenceSubmissionsQueryValidator : DbContextValidator<GetConferenceSubmissionsQuery>
    {
        public GetConferenceSubmissionsQueryValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            Include(new EntityPageQueryValidator<SubmissionDto>());

            RuleFor(x => x).CustomAsync(async (query, context, cancelToken) =>
            {
                var conference = await Context.Conferences.FindAsync(query.ConferenceId, cancelToken);

                if (conference == null)
                {
                    context.AddException(new NotFoundException("Conference not found"));
                    return;
                }

                if (!CurrentUser.IsParticipantOf(conference))
                {
                    context.AddException(new ForbiddenException("Not a participant of conference"));
                }
            });
        }
    }
}
