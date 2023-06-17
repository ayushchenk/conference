﻿using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.AddPreference
{
    public class AddReviewPreferenceCommandValidator : DbContextValidator<AddReviewPreferenceCommand>
    {
        public AddReviewPreferenceCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.SubmissionId);

            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var submission = await Context.Submissions.FindAsync(command.SubmissionId, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("User or submission not found"));
                    return;
                }

                if (!CurrentUser.IsParticipantOf(submission.Conference))
                {
                    context.AddException(new ForbiddenException("User is not part of conference"));
                    return;
                }

                if (!CurrentUser.IsReviewerIn(submission.Conference))
                {
                    context.AddException(new ForbiddenException("User is not a reviwer"));
                }
            });
        }
    }
}
