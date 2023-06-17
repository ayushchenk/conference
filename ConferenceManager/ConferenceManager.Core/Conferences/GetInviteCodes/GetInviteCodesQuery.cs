using ConferenceManager.Core.Common.Queries;

namespace ConferenceManager.Core.Conferences.GetInviteCodes
{
    public class GetInviteCodesQuery : GetEntitiesQuery<InviteCode>
    {
        public int ConferenceId { get; }

        public GetInviteCodesQuery(int conferenceId)
        {
            ConferenceId = conferenceId;
        }
    }
}
