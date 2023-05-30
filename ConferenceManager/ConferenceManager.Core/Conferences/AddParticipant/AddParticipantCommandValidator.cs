using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.AddParticipant
{
    public class AddParticipantCommandValidator : DbContextValidator<AddParticipantCommand>
    {
        public AddParticipantCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleFor(x => x.ConferenceId)
                .GreaterThan(0).WithMessage("ConferenceId is required");

            RuleFor(x => x.UserId)
                .GreaterThan(0).WithMessage("UserId is required");

            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var conference = await Context.Conferences.FindAsync(command.ConferenceId, cancelToken);
                var user = await Context.Users.FindAsync(command.UserId, cancelToken);

                if (user == null || conference == null)
                {
                    context.AddException(new NotFoundException("User of conference not found"));
                }
            });
        }
    }
}
