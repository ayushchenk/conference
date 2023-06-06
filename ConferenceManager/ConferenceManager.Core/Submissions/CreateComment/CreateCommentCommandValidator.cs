using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.CreateComment
{
    public class CreateCommentCommandValidator : DbContextValidator<CreateCommentCommand>
    {
        public CreateCommentCommandValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.SubmissionId);
            RuleForString(x => x.Text, 1000, true);

            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var submission = await Context.Submissions.FindAsync(command.SubmissionId, token);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (!CurrentUser.IsReviewerOf(submission) || !CurrentUser.IsAuthorOf(submission))
                {
                    context.AddException(new ForbiddenException("Not a reviewer or owner of the submission"));
                }
            });
        }
    }
}
