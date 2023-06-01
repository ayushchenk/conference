using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.User.Register
{
    public class RegisterUserCommandValidator : Validator<RegisterUserCommand>
    {
        public RegisterUserCommandValidator()
        {
            RuleForString(x => x.Email, 100, true)
                .EmailAddress().WithMessage("Email should be of valid format");

            RuleForString(x => x.Password, 50, true);
            RuleForString(x => x.FirstName, 50, true);
            RuleForString(x => x.LastName, 50, true);
            RuleForString(x => x.Country, 50, true);
            RuleForString(x => x.Affiliation, 100, true);
            RuleForString(x => x.Webpage, 100, false);
        }
    }
}
