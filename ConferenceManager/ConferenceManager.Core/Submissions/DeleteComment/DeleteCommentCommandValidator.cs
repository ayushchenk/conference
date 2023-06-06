using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.DeleteComment
{
    public class DeleteCommentCommandValidator : DbContextValidator<DeleteCommentCommand>
    {
        public DeleteCommentCommandValidator(
            IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);

            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var comment = await Context.Comments.FindAsync(command.Id);

                if (comment == null)
                {
                    context.AddException(new NotFoundException("Comment not found"));
                    return;
                }

                if (!CurrentUser.IsAuthorOf(comment))
                {
                    context.AddException(new NotFoundException("Not an author of the comment"));
                }
            });
        }
    }
}
