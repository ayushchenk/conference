using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Infrastructure.Util;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommandValidator : DbContextValidator<UpdateConferenceCommand>
    {
        public UpdateConferenceCommandValidator(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IOptions<SeedSettings> settings) : base(context, currentUser)
        {
            Include(new ConferenceCommandBaseValidator());

            RuleForId(x => x.Id);

            RuleFor(x => x.Title)
                .Must(t => t != settings.Value.AdminConference)
                .WithMessage("Title not available");

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
