using ConferenceManager.Core.Common.Model.Token;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.User.Register
{
    public class RegisterUserCommand : IRequest<TokenResponse>
    {
        [Required]
        [MaxLength(256)]
        public string Email { get; init; } = null!;

        [Required]
        [MaxLength(100)]
        public string Password { get; init; } = null!;

        [Required]
        [MaxLength(50)]
        public string FirstName { get; init; } = null!;

        [Required]
        [MaxLength(50)]
        public string LastName { get; init; } = null!;

        [Required]
        [MaxLength(50)]
        public string Country { get; init; } = null!;

        [Required]
        [MaxLength(100)]
        public string Affiliation { get; init; } = null!;

        [MaxLength(100)]
        public string? Webpage { get; init; }

        [MaxLength(20)]
        public string? InviteCode { get; init; }
    }
}
