﻿using ConferenceManager.Core.Common.Exceptions;
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
            RuleForId(x => x.SubmissionId);
            RuleForString(x => x.Evaluation, 1000, true);
            RuleForArray(x => x.Confidence, SupportedConfidences);

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
