using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.Get
{
    public class GetSubmissionQueryValidator : DbContextValidator<GetSubmissionQuery>
    {
        public GetSubmissionQueryValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Id is required");

            RuleFor(x => x).CustomAsync(async (query, context, cancelToken) =>
            {
                var submission = await Context.Submissions.FindAsync(query.Id, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (CurrentUser.HasAuthorRole && !CurrentUser.IsAuthorOf(submission))
                {
                    context.AddException(new NotFoundException("Author can only access his own submissions"));
                    return;
                }

                if (!CurrentUser.IsParticipantOf(submission.Conference))
                {
                    context.AddException(new ForbiddenException("Is not part of conference"));
                }
            });
        }
    }
}
