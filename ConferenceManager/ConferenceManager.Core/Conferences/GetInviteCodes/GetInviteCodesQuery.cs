using ConferenceManager.Core.Common.Queries;
using ConferenceManager.Core.Conferences.Common;

namespace ConferenceManager.Core.Conferences.GetInviteCodes
{
    public class GetInviteCodesQuery : GetEntitiesQuery<InviteCodeDto>
    {
        public int ConferenceId { get; }

        public GetInviteCodesQuery(int conferenceId)
        {
            ConferenceId = conferenceId;
        }
    }
}
