using MediatR;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.User.AddRole
{
    public class UnassignRoleCommand : IRequest
    {
        [JsonIgnore]
        public int Id { get; set; }

        [Required]
        public string Role { get; set; } = null!;

        [JsonIgnore]
        public int ConferenceId { get; set; }
    }
}
