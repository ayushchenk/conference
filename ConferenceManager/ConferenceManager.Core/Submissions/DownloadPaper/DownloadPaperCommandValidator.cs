using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.DownloadPaper
{
    public class DownloadPaperCommandValidator : DbContextValidator<DownloadPaperCommand>
    {
        public DownloadPaperCommandValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.PaperId);

            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var paper = await Context.Papers.FindAsync(command.PaperId);

                if (paper == null)
                {
                    context.AddException(new NotFoundException("Paper not found"));
                    return;
                }

                if (CurrentUser.IsChairIn(paper.Submission.Conference) 
                    || CurrentUser.IsAuthorOf(paper)
                    || CurrentUser.IsReviewerOf(paper.Submission))
                {
                    return;
                }

                if (CurrentUser.IsReviewerIn(paper.Submission.Conference) && !CurrentUser.IsReviewerOf(paper.Submission))
                {
                    context.AddException(new ForbiddenException("Not a reviewer of the submission"));
                    return;
                }

                if (!CurrentUser.IsAuthorOf(paper))
                {
                    context.AddException(new ForbiddenException("Not an author of the submission"));
                }
            });
        }
    }
}
