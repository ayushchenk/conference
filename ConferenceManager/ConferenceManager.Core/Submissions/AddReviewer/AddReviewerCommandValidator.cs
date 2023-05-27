using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.AddReviewer
{
    public class AddReviewerCommandValidator : DbContextValidator<AddReviewerCommand>
    {
        public AddReviewerCommandValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            UserManager<ApplicationUser> userManager) : base(context, currentUser)
        {
            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var submission = await Context.Submissions.FindAsync(command.SubmissionId, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                var user = await Context.Users
                    .Include(u => u.ConferenceParticipations)
                    .FirstOrDefaultAsync(u => u.Id == command.UserId, cancelToken);

                if (user == null)
                {
                    context.AddException(new NotFoundException("User not found"));
                    return;
                }

                if (!user.IsParticipantOf(submission.Conference))
                {
                    context.AddException(new ForbiddenException("User is not part of conference"));
                    return;
                }

                if (!await userManager.IsInRoleAsync(user, ApplicationRole.Reviewer))
                {
                    context.AddException(new ForbiddenException("User is not a reviewer"));
                }
            });
        }
    }
}
