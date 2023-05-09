using ConferenceManager.Core.Common.Model.Token;
using MediatR;

namespace ConferenceManager.Core.Account.Commands.Register
{
    public class RegisterUserCommand : IRequest<TokenResponse>
    {
        public required string Email { get; init; }

        public required string Password { get; init; }

        public required string FirstName { get; init; }

        public required string LastName { get; init; }

        public required string Country { get; init; }

        public required string Affiliation { get; init; }

        public string? Webpage { get; init; }
    }
}
