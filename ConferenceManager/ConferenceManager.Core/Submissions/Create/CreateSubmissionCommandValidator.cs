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
            RuleForId(x => x.ConferenceId);
            RuleForString(x => x.Title, 100, true);
            RuleForString(x => x.Keywords, 100, true);
            RuleForString(x => x.Abstract, 1000, true);

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
