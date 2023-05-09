using ConferenceManager.Core.Common.Model.Token;
using MediatR;

namespace ConferenceManager.Core.Account.Commands.Login
{
    public class LoginUserCommand : IRequest<TokenResponse>
    {
        public required string Email { get; init; }

        public required string Password { get; init; }
    }
}
