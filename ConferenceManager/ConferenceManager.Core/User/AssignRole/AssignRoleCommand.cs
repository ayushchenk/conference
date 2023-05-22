using ConferenceManager.Core.Common.Commands;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.User.AddRole
{
    public class AssignRoleCommand : IUpdateEntityCommand
    {
        [JsonIgnore]
        public int Id { get; }

        public string Role { get; }

        public AssignRoleCommand(int id, string role)
        {
            Id = id;
            Role = role;
        }
    }
}
