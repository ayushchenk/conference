using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Submissions.Update;
using ConferenceManager.Domain.Entities;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.Create
{
    public class UpdateSubmissionCommandValidator : DbContextValidator<UpdateSubmissionCommand>
    {
        public UpdateSubmissionCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
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

            RuleFor(x => x).CustomAsync(async (command, context, cancelToken) =>
            {
                var submission = await Context.Submissions
                    .AsNoTracking()
                    .FirstOrDefaultAsync(s => s.Id == command.Id, cancelToken);

                if (submission == null)
                {
                    context.AddException(new NotFoundException("Submission not found"));
                    return;
                }

                if (!submission.IsValidForUpdate)
                {
                    context.AddException(new ForbiddenException("Can only update returned submissions"));
                    return;
                }

                var conference = await Context.Conferences.FindAsync(submission.ConferenceId, cancelToken);

                var conferenceAreas = conference!.ResearchAreas.Split(Conference.ResearchAreasSeparator, StringSplitOptions.RemoveEmptyEntries);

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
