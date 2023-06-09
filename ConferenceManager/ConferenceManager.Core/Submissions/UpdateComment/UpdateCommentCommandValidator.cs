using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.UpdateComment
{
    public class UpdateCommentCommandValidator : DbContextValidator<UpdateCommentCommand>
    {
        public UpdateCommentCommandValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
            RuleForString(x => x.Text, 1000, true);

            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var comment = await Context.Comments
                    .AsNoTracking()
                    .FirstOrDefaultAsync(c => c.Id == command.Id, token);

                if (comment == null)
                {
                    context.AddException(new NotFoundException("Comment not found"));
                    return;
                }

                if (!CurrentUser.IsAuthorOf(comment))
                {
                    context.AddException(new ForbiddenException("Not an author of the comment"));
                }
            });
        }
    }
}
