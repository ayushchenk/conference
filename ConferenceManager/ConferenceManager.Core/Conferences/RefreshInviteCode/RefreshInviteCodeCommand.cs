using ConferenceManager.Core.Conferences.Common;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.Conferences.RefreshInviteCode
{
    public class RefreshInviteCodeCommand : IRequest<InviteCodeDto>
    {
        [Required]
        public string Code { set; get; } = null!;
    }
}
