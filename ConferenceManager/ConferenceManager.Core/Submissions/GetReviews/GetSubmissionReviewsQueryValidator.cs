﻿using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.GetReviews
{
    public class GetSubmissionReviewsQueryValidator : DbContextValidator<GetSubmissionReviewsQuery>
    {
        public GetSubmissionReviewsQueryValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
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

                if (CurrentUser.IsAdmin || CurrentUser.IsChairIn(submission.Conference))
                {
                    return;
                }

                if (CurrentUser.IsReviewerIn(submission.Conference) && !CurrentUser.IsReviewerOf(submission))
                {
                    context.AddException(new ForbiddenException("User is not a reviewer of this submission"));
                }

                if (CurrentUser.IsAuthorIn(submission.Conference) && !CurrentUser.IsAuthorOf(submission))
                {
                    context.AddException(new ForbiddenException("User is not an author of this submission"));
                }
            });
        }
    }
}
