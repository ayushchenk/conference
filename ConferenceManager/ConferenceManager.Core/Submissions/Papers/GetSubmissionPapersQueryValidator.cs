﻿using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.Papers
{
    public class GetSubmissionPapersQueryValidator : DbContextValidator<GetSubmissionPapersQuery>
    {
        public GetSubmissionPapersQueryValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleFor(x => x.SubmissionId)
                .GreaterThan(0).WithMessage("SubmissionId is required");

            RuleFor(x => x).CustomAsync(async (query, context, cancelToken) =>
            {
                var submission = await Context.Submissions.FindAsync(query.SubmissionId, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if ((CurrentUser.HasAuthorRole && !CurrentUser.IsAuthorOf(submission))
                    || !CurrentUser.IsReviewerOf(submission))
                {
                    context.AddException(new ForbiddenException("Must be author or reviewer"));
                }
            });
        }
    }
}