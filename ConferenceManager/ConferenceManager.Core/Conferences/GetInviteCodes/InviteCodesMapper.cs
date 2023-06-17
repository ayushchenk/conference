using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.GetInviteCodes
{
    public class InviteCodesMapper : IMapper<Conference, IEnumerable<InviteCode>>
    {
        public IEnumerable<InviteCode> Map(Conference source)
        {
            return new InviteCode[]
            {
                new InviteCode()
                {
                    Type = ApplicationRole.Author,
                    Code = source.AuthorInviteCode
                },
                new InviteCode()
                {
                    Type = ApplicationRole.Reviewer,
                    Code = source.ReviewerInviteCode
                },
                new InviteCode()
                {
                    Type = ApplicationRole.Chair,
                    Code = source.ChairInviteCode
                }
            };
        }
    }
}
