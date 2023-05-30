using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Submissions.Create
{
    public class CreateSubmissionCommandValidator : DbContextValidator<CreateSubmissionCommand>
    {
        public CreateSubmissionCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleFor(x => x.ConferenceId)
                .GreaterThan(0).WithMessage("ConferenceId is required");

            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(100).WithMessage("Maximum length for Title is 100");

            RuleFor(x => x.Keywords)
                .NotEmpty().WithMessage("Keywords are required")
                .MaximumLength(100).WithMessage("Maximum length for Keywords is 100");

            RuleFor(x => x.Abstract)
                .NotEmpty().WithMessage("Abstract is required")
                .MaximumLength(1000).WithMessage("Maximum length for Abstract is 1000");

            RuleFor(x => x.File)
                .NotEmpty().WithMessage("File is required");

            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var conference = await Context.Conferences.FindAsync(command.ConferenceId, cancelToken);

                if (conference == null)
                {
                    context.AddException(new NotFoundException("Conference not found"));
                    return;
                }

                if (!CurrentUser.IsParticipantOf(conference))
                {
                    context.AddException(new ForbiddenException("Is not part of conference"));
                }
            });
        }
    }
}
