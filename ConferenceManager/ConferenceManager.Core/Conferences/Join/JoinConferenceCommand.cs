using ConferenceManager.Core.Common.Model.Token;
using MediatR;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.Conferences.Join
{
    public class JoinConferenceCommand : IRequest<TokenResponse>
    {
        [Required]
        [MaxLength(20)]
        public string Code { get; set; } = null!;

        [JsonIgnore]
        public int UserId { get; set; }
    }
}
