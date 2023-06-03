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
            RuleForId(x => x.ConferenceId);
            RuleForId(x => x.UserId);

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
