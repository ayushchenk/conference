using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Conferences.Common;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommandValidator : DbContextValidator<UpdateConferenceCommand>
    {
        public UpdateConferenceCommandValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser) : base(context, currentUser)
        {
            Include(new ConferenceCommandBaseValidator());

            RuleForId(x => x.Id);

            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var conference = await Context.Conferences
                    .AsNoTracking()
                    .FirstOrDefaultAsync(c => c.Id == command.Id, cancelToken);

                if (conference == null)
                {
                    context.AddException(new NotFoundException("Conference not found"));
                }
            });
        }
    }
}
