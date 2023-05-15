using FluentValidation;

namespace ConferenceManager.Core.Conferences.Create
{
    public class CreateConferenceCommandValidator : AbstractValidator<CreateConferenceCommand>
    {
        public CreateConferenceCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty().WithMessage("Title is required")
                .MaximumLength(100).WithMessage("Maximum length for Title is 100");

            RuleFor(x => x.Acronyn)
                .NotEmpty().WithMessage("Acronym is required")
                .MaximumLength(20).WithMessage("Maximum length for Acronym is 20");

            RuleFor(x => x.Organizer)
                .NotEmpty().WithMessage("Organizer is required")
                .MaximumLength(100).WithMessage("Maximum length for Organizer is 100");

            RuleFor(x => x.StartDate)
                .NotEmpty().WithMessage("StartDate is required");

            RuleFor(x => x.EndDate)
                .NotEmpty().WithMessage("EndDate is required");

            RuleFor(x => x.Keywords)
                .MaximumLength(100).WithMessage("Maximum length for Keywords is 100");

            RuleFor(x => x.Webpage)
                .MaximumLength(100).WithMessage("Maximum length for Webpage is 100");

            RuleFor(x => x.Venue)
                .MaximumLength(100).WithMessage("Maximum length for Venue is 100");

            RuleFor(x => x.City)
                .MaximumLength(100).WithMessage("Maximum length for City is 100");

            RuleFor(x => x.SecondaryResearchArea)
                .MaximumLength(100).WithMessage("Maximum length for SecondaryResearchArea is 100");

            RuleFor(x => x.AreaNotes)
                .MaximumLength(500).WithMessage("Maximum length for AreaNotes is 500");

            RuleFor(x => x.OrganizerWebpage)
                .MaximumLength(100).WithMessage("Maximum length for OrganizerWebpage is 100");

            RuleFor(x => x.ContactPhoneNumber)
                .MaximumLength(20).WithMessage("Maximum length for ContactPhoneNumber is 20");
        }
    }
}
