using MediatR;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.User.AddRole
{
    public class UnassignRoleCommand : IRequest
    {
        [JsonIgnore]
        public int Id { get; }

        public string Role { get; }

        public UnassignRoleCommand(int id, string role)
        {
            Id = id;
            Role = role;
        }
    }
}
