using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Conferences.Common
{
    public class InviteCodeDto : IDto
    {
        public required int Id { get; set; }

        public required int ConferenceId { get; set; }

        public required string Code { set; get; }

        public required string Role { set; get; }
    }
}
