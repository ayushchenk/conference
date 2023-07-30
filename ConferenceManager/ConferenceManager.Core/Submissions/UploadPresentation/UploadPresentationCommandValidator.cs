using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.UploadPresentation
{
    public class UploadPresentationCommandValidator : DbContextValidator<UploadPresentationCommand>
    {
        public UploadPresentationCommandValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleFor(x => x.File).NotNull().WithMessage("File is requried");

            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var submission = await Context.Submissions.FindAsync(command.SubmissionId, token);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (!CurrentUser.IsAuthorOf(submission))
                {
                    context.AddException(new ForbiddenException("Not an author of the submission"));
                    return;
                }

                if (submission.Status == Domain.Enums.SubmissionStatus.Rejected)
                {
                    context.AddException(new ForbiddenException("Submission is rejected"));
                    return;
                }
            });
        }
    }
}
