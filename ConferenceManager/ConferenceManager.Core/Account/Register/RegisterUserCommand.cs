using ConferenceManager.Core.Common.Model.Token;
using MediatR;

namespace ConferenceManager.Core.Account.Register
{
    public class RegisterUserCommand : IRequest<TokenResponse>
    {
        public string Email { get; init; } = null!;

        public required string Password { get; init; }

        public string FirstName { get; init; } = null!;

        public string LastName { get; init; } = null!;

        public string Country { get; init; } = null!;

        public string Affiliation { get; init; } = null!;

        public string? Webpage { get; init; }
    }
}
