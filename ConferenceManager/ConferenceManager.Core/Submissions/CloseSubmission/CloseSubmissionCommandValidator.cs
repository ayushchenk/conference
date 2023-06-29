using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Domain.Enums;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.CloseSubmission
{
    public class CloseSubmissionCommandValidator : DbContextValidator<CloseSubmissionCommand>
    {
        public CloseSubmissionCommandValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.SubmissionId);
            RuleFor(x => x.Status)
                .Must(x => x == SubmissionStatus.Accepted || x == SubmissionStatus.Rejected)
                .WithMessage("Status should be Accepted of Rejected");

            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var submission = await Context.Submissions
                    .AsNoTracking()
                    .FirstOrDefaultAsync(s => s.Id == command.SubmissionId, token);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                }
            });
        }
    }
}
