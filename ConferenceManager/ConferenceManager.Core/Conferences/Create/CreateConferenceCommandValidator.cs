using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Infrastructure.Util;
using FluentValidation;
using Microsoft.Extensions.Options;

namespace ConferenceManager.Core.Conferences.Create
{
    public class CreateConferenceCommandValidator : AbstractValidator<CreateConferenceCommand>
    {
        public CreateConferenceCommandValidator(IOptions<SeedSettings> settings)
        {
            Include(new ConferenceCommandBaseValidator());
            RuleFor(x => x.Title)
                .Must(t => t != settings.Value.AdminConference)
                .WithMessage("Title not available");
        }
    }
}
