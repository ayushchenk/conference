using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Submissions.CreateReview;
using ConferenceManager.Domain.Enums;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.UpdateReview
{
    public class UpdateReviewCommandValidator : DbContextValidator<UpdateReviewCommand>
    {
        public UpdateReviewCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
            RuleForId(x => x.SubmissionId);
            RuleForString(x => x.Evaluation, 1000, true);
            RuleForArray(x => x.Confidence, CreateReviewCommandValidator.SupportedConfidences);
            RuleFor(x => x.Score)
                .Must(x => x >= -10 && x <= 10)
                .WithMessage("Valid range for score is from -10 inclusive to 10 inclusive");

            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var submission = await Context.Submissions.FindAsync(command.SubmissionId, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (submission.Status == SubmissionStatus.Accepted
                    || submission.Status == SubmissionStatus.Rejected)
                {
                    context.AddException(new NotFoundException("Submission is closed"));
                    return;
                }

                var review = await Context.Reviews
                    .AsNoTracking()
                    .FirstOrDefaultAsync(r => r.Id == command.Id, cancelToken);

                if (review == null)
                {
                    context.AddException(new NotFoundException("Review not found"));
                    return;
                }

                if (review.CreatedById != CurrentUser.Id)
                {
                    context.AddException(new ForbiddenException("Not author of review"));
                    return;
                }
            });
        }
    }
}
