using FluentValidation;

namespace ConferenceManager.Core.Conferences.Commands.Create
{
    public class CreateConferenceCommandValidator : AbstractValidator<CreateConferenceCommand>
    {
        public CreateConferenceCommandValidator()
        {
            RuleFor(x => x.Entity.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(100).WithMessage("Maximum length for Title is 100");

            RuleFor(x => x.Entity.Acronyn)
                .NotEmpty().WithMessage("Acronym is required")
                .MaximumLength(20).WithMessage("Maximum length for Acronym is 20");

            RuleFor(x => x.Entity.Organizer)
                .NotEmpty().WithMessage("Organizer is required")
                .MaximumLength(100).WithMessage("Maximum length for Organizer is 100");

            RuleFor(x => x.Entity.StartDate)
                .NotEmpty().WithMessage("StartDate is required");

            RuleFor(x => x.Entity.EndDate)
                .NotEmpty().WithMessage("EndDate is required");

            RuleFor(x => x.Entity.Keywords)
                .MaximumLength(100).WithMessage("Maximum length for Keywords is 100");

            RuleFor(x => x.Entity.Webpage)
                .MaximumLength(100).WithMessage("Maximum length for Webpage is 100");

            RuleFor(x => x.Entity.Venue)
                .MaximumLength(100).WithMessage("Maximum length for Venue is 100");

            RuleFor(x => x.Entity.City)
                .MaximumLength(100).WithMessage("Maximum length for City is 100");

            RuleFor(x => x.Entity.SecondaryResearchArea)
                .MaximumLength(100).WithMessage("Maximum length for SecondaryResearchArea is 100");

            RuleFor(x => x.Entity.AreaNotes)
                .MaximumLength(500).WithMessage("Maximum length for AreaNotes is 500");

            RuleFor(x => x.Entity.OrganizerWebpage)
                .MaximumLength(100).WithMessage("Maximum length for OrganizerWebpage is 100");

            RuleFor(x => x.Entity.ContactPhoneNumber)
                .MaximumLength(20).WithMessage("Maximum length for ContactPhoneNumber is 20");
        }
    }
}
