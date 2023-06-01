using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Submissions.Update;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.Create
{
    public class UpdateSubmissionCommandValidator : DbContextValidator<UpdateSubmissionCommand>
    {
        public UpdateSubmissionCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
            RuleForString(x => x.Title, 100, true);
            RuleForString(x => x.Keywords, 100, true);
            RuleForString(x => x.Abstract, 1000, true);

            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var submission = await Context.Submissions
                    .AsNoTracking()
                    .FirstOrDefaultAsync(s => s.Id == command.Id, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (!submission.IsValidForUpdate)
                {
                    context.AddException(new ForbiddenException("Can only update returned submissions"));
                }
            });
        }
    }
}
