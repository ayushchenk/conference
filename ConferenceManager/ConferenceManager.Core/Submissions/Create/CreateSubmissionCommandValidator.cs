using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Domain.Entities;
using FluentValidation;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ConferenceManager.Core.Submissions.Create
{
    public class CreateSubmissionCommandValidator : DbContextValidator<CreateSubmissionCommand>
    {
        public CreateSubmissionCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.ConferenceId);
            RuleForString(x => x.Title, 100, true);
            RuleForString(x => x.Keywords, 100, true);
            RuleForString(x => x.Abstract, 1000, true);

            RuleFor(x => x.ResearchAreas)
                .NotNull()
                .NotEmpty()
                .Custom((areas, context) =>
                {
                    if (areas.Length > 10)
                    {
                        context.AddFailure("ResearchAreas", "Maximum length of Research Areas array is 10");
                    }

                    string joined = string.Join(Conference.ResearchAreasSeparator, areas);

                    if (joined.Length > 500)
                    {
                        context.AddFailure("ResearchAreas", "Total length of joined strings in the Research Areas array should be less than 500");
                    }
                });

            RuleFor(x => x.MainFile)
                .NotEmpty().WithMessage("File is required");

            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var conference = await Context.Conferences.FindAsync(command.ConferenceId, cancelToken);

                if (conference!.IsAnonymizedFileRequired && command.AnonymizedFile == null)
                {
                    context.AddFailure("AnonymizedFile", "Anonymized file is requried by conference settings");
                }

                var conferenceAreas = conference.ResearchAreas.Split(Conference.ResearchAreasSeparator, StringSplitOptions.RemoveEmptyEntries);

                bool areasInvalid = false;

                foreach (var commandArea in command.ResearchAreas)
                {
                    if (!conferenceAreas.Contains(commandArea))
                    {
                        areasInvalid = true;
                    }
                }

                if (areasInvalid)
                {
                    context.AddFailure("ResearchAreas", "Valid research areas are " + conference.ResearchAreas);
                }
            });
        }
    }
}
