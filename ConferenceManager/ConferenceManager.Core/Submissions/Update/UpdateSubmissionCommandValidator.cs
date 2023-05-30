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
            RuleFor(x => x.Id)
                .GreaterThan(0).WithMessage("Id is required");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(100).WithMessage("Maximum length for Title is 100");

            RuleFor(x => x.Keywords)
                .NotEmpty().WithMessage("Keywords are required")
                .MaximumLength(100).WithMessage("Maximum length for Keywords is 100");

            RuleFor(x => x.Abstract)
                .NotEmpty().WithMessage("Abstract is required")
                .MaximumLength(1000).WithMessage("Maximum length for Abstract is 1000");

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
