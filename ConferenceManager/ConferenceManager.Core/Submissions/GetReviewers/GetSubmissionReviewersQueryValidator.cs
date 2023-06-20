using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.GetReviewers
{
    public class GetSubmissionReviewersQueryValidator : DbContextValidator<GetSubmissionReviewersQuery>
    {
        public GetSubmissionReviewersQueryValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.SubmissionId);

            RuleFor(x => x).CustomAsync(async (query, context, cancelToken) =>
            {
                var submission = await Context.Submissions.FindAsync(query.SubmissionId, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }
            });
        }
    }
}
