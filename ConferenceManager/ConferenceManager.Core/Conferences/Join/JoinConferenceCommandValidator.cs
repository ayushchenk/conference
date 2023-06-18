using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Conferences.Join
{
    public class JoinConferenceCommandValidator : DbContextValidator<JoinConferenceCommand>
    {
        public JoinConferenceCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForString(x => x.Code, 20, true);

            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var code = await Context.InviteCodes.FirstOrDefaultAsync(c => c.Code == command.Code);

                if (code == null)
                {
                    context.AddException(new NotFoundException("Code not found"));
                }
            });
        }
    }
}
