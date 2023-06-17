using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.Delete
{
    public class DeleteConferenceCommandValidator : DbContextValidator<DeleteConferenceCommand>
    {
        public DeleteConferenceCommandValidator
            (IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var conference = await Context.Conferences.FindAsync(command.Id, token);

                if (conference == null)
                {
                    context.AddException(new NotFoundException("Conference not found"));
                }
            });
        }
    }
}
