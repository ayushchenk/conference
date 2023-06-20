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
            RuleForId(x => x.Id);

            RuleFor(x => x).CustomAsync(async (query, context, cancelToken) =>
            {
                var submission = await Context.Submissions.FindAsync(query.Id, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (CurrentUser.IsAdmin || CurrentUser.IsChairIn(submission.Conference))
                {
                    return;
                }

                if (CurrentUser.IsAuthorIn(submission.Conference) && !CurrentUser.IsAuthorOf(submission))
                {
                    context.AddException(new ForbiddenException("Author can only access his own submissions"));
                    return;
                }
            });
        }
    }
}
