using ConferenceManager.Core.Common.Model.Token;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.User.Login
{
    public class LoginUserCommand : IRequest<TokenResponse>
    {
        [Required]
        [MaxLength(256)]
        public string Email { get; init; } = null!;

        [Required]
        [MaxLength(100)]
        public string Password { get; init; } = null!;
    }
}
