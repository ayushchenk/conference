using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.GetComments
{
    public class GetCommentsQueryValidator : DbContextValidator<GetCommentsQuery>
    {
        public GetCommentsQueryValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.SubmissionId);

            RuleFor(x => x).CustomAsync(async (query, context, token) =>
            {
                var submission = await Context.Submissions.FindAsync(query.SubmissionId, token);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (!CurrentUser.IsReviewerOf(submission))
                {
                    context.AddException(new ForbiddenException("Not a reviewer of submission"));
                }
            });
        }
    }
}
