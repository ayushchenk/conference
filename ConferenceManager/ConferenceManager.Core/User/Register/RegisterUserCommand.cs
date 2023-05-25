using ConferenceManager.Core.Common.Model.Token;
using MediatR;

namespace ConferenceManager.Core.User.Register
{
    public class RegisterUserCommand : IRequest<TokenResponse>
    {
        public string Email { get; init; } = null!;

        public string Password { get; init; } = null!;

        public string FirstName { get; init; } = null!;

        public string LastName { get; init; } = null!;

        public string Country { get; init; } = null!;

        public string Affiliation { get; init; } = null!;

        public string? Webpage { get; init; }
    }
}
