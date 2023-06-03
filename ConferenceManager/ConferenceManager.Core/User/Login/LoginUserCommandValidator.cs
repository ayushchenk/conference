using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.User.Login
{
    public class LoginUserCommandValidator : Validator<LoginUserCommand>
    {
        public LoginUserCommandValidator()
        {
            RuleForString(x => x.Email, 100, true)
                .EmailAddress().WithMessage("Email should be of valid format");

            RuleForString(x => x.Password, 50, true);
        }
    }
}
