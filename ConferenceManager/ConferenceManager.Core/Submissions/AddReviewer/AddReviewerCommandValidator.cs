using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace ConferenceManager.Core.Submissions.AddReviewer
{
    public class AddReviewerCommandValidator : DbContextValidator<AddReviewerCommand>
    {
        public AddReviewerCommandValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var submission = await Context.Submissions.FindAsync(command.SubmissionId, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                var user = await Context.Users.FindAsync(command.UserId, cancelToken);

                if (user == null)
                {
                    context.AddException(new NotFoundException("User not found"));
                    return;
                }

                var userParticipation = await Context.ConferenceParticipants
                    .FindAsync(new object[] { user.Id, submission.ConferenceId });

                if (userParticipation == null)
                {
                    context.AddException(new ForbiddenException("User is not part of conference"));
                    return;
                }

                var hasReviewerRole = await Context.UserRoles.AnyAsync(r => 
                    r.UserId == user.Id 
                    && r.ConferenceId == submission.ConferenceId 
                    && r.Role.Name == ApplicationRole.Reviewer, cancelToken);

                if (!hasReviewerRole)
                {
                    context.AddException(new ForbiddenException("User is not a reviewer"));
                }
            });
        }
    }
}
