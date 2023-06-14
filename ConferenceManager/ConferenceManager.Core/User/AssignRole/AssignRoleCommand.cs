using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.User.AddRole
{
    public class AssignRoleCommand : IRequest
    {
        [JsonIgnore]
        public int Id { get; set; }

        [Required]
        public string Role { get; set; } = null!;

        [JsonIgnore]
        public int ConferenceId { get; set; }
    }
}
