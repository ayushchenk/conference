using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.User.AddRole;
using ConferenceManager.Domain.Entities;
using FluentValidation;

namespace ConferenceManager.Core.User.AssignRole
{
    public class UnassignRoleCommandValidator : DbContextValidator<UnassignRoleCommand>
    {
        public UnassignRoleCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
            RuleForId(x => x.ConferenceId);
            RuleForArray(x => x.Role, new string[] { ApplicationRole.Author, ApplicationRole.Reviewer, ApplicationRole.Chair });

            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var user = await Context.Users.FindAsync(command.Id, token);

                if (user == null)
                {
                    context.AddException(new NotFoundException("User not found"));
                    return;
                }

                var conference = await Context.Conferences.FindAsync(command.ConferenceId, token);

                if (conference == null)
                {
                    context.AddException(new NotFoundException("Conference not found"));
                    return;
                }

                var isParticipant = conference.Participants.Any(p => p.Id == user.Id);

                if (!isParticipant)
                {
                    context.AddException(new ForbiddenException("User is not part of the conference"));
                    return;
                }
            });
        }
    }
}
