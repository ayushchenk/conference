using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.User.AddRole
{
    public class UnassignRoleCommand : IRequest
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Role { get; set; } = null!;

        [Required]
        public int ConferenceId { get; set; }
    }
}
