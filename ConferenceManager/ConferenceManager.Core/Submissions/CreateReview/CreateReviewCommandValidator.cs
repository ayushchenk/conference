using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.CreateReview
{
    public class CreateReviewCommandValidator : DbContextValidator<CreateReviewCommand>
    {
        public CreateReviewCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleFor(x => x.SubmissionId)
                .GreaterThan(0).WithMessage("SubmissionId is required");

            RuleFor(x => x.Evaluation)
                .NotEmpty().WithMessage("Evaluation is required")
                .MaximumLength(1000).WithMessage("Maximum length for Evaluation 1000");

            RuleFor(x => x.Confidence)
                .NotEmpty().WithMessage("Confidence is required");

            RuleFor(x => x).Custom((command, valContext) =>
            {
                var submission = Context.Submissions.Find(command.SubmissionId);

                if (submission == null)
                {
                    valContext.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (!currentUser.IsReviewerOf(submission))
                {
                    valContext.AddException(new ForbiddenException("Not a reviewer of submission"));
                }
            });
        }
    }
}
