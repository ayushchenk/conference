using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Domain.Enums;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.CreateReview
{
    public class CreateReviewCommandValidator : DbContextValidator<CreateReviewCommand>
    {
        public static readonly ReviewConfidence[] SupportedConfidences = new ReviewConfidence[]
        {
            ReviewConfidence.VeryLow,
            ReviewConfidence.Low,
            ReviewConfidence.Medium,
            ReviewConfidence.High,
            ReviewConfidence.VeryHigh
        };

        public CreateReviewCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleFor(x => x.SubmissionId)
                .GreaterThan(0).WithMessage("SubmissionId is required");

            RuleFor(x => x.Evaluation)
                .NotEmpty().WithMessage("Evaluation is required")
                .MaximumLength(1000).WithMessage("Maximum length for Evaluation 1000");

            RuleFor(x => x.Confidence)
                .NotEmpty().WithMessage("Confidence is required")
                .Must(x => SupportedConfidences.Contains(x)).WithMessage("Provided Confidence is out of range");

            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var submission = await Context.Submissions.FindAsync(command.SubmissionId, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (!CurrentUser.IsReviewerOf(submission))
                {
                    context.AddException(new ForbiddenException("Not a reviewer of submission"));
                    return;
                }

                if (submission.HasReviewFrom(CurrentUser.Id))
                {
                    context.AddException(new ForbiddenException("Already reviewed"));
                }
            });
        }
    }
}
