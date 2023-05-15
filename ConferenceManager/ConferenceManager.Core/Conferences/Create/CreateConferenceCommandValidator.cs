using ConferenceManager.Core.Conferences.Common;
using FluentValidation;

namespace ConferenceManager.Core.Conferences.Create
{
    public class CreateConferenceCommandValidator : AbstractValidator<CreateConferenceCommand>
    {
        public CreateConferenceCommandValidator()
        {
            Include(new ConferenceCommandBaseValidator());
        }
    }
}
