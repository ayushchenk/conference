using ConferenceManager.Core.Common.Model.Token;
using MediatR;

namespace ConferenceManager.Core.Account.Login
{
    public class LoginUserCommand : IRequest<TokenResponse>
    {
        public string Email { get; init; } = null!;

        public string Password { get; init; } = null!;
    }
}
