using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Conferences.Model;
using ConferenceManager.Domain.Entities;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.Common
{
    public class ConferenceCommandBaseValidator : Validator<ConferenceCommandBase>
    {
        public ConferenceCommandBaseValidator()
        {
            RuleForString(x => x.Title, 100, true);
            RuleForString(x => x.Acronym, 20, true);
            RuleForString(x => x.Organizer, 100, true);

            RuleFor(x => x.StartDate)
                .NotEmpty().WithMessage("StartDate is required");

            RuleFor(x => x.EndDate)
                .NotEmpty().WithMessage("EndDate is required");

            RuleForString(x => x.Keywords, 100, false);
            RuleForString(x => x.Abstract, 1000, false);
            RuleForString(x => x.Webpage, 100, false);
            RuleForString(x => x.Venue, 100, false);
            RuleForString(x => x.City, 100, false);
            RuleForString(x => x.AreaNotes, 500, false);
            RuleForString(x => x.OrganizerWebpage, 100, false);
            RuleForString(x => x.ContactPhoneNumber, 20, false);

            RuleFor(x => x.ResearchAreas)
                .NotEmpty().WithMessage("ResearchAreas is required")
                .Custom((areas, context) =>
                {
                    if(areas.Length > 10)
                    {
                        context.AddFailure("ResearchAreas", "Maximum length of array if 10");
                    }

                    string joined = string.Join(Conference.ResearchAreasSeparator, areas);
                    if(joined.Length > 500)
                    {
                        context.AddFailure("ResearchAreas", "Total length of joined strings in the array should be less then 500");
                    }
                });
        }
    }
}
