using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Common
{
    public class InviteCodeDtoMapper : IMapper<InviteCode, InviteCodeDto>
    {
        public InviteCodeDto Map(InviteCode source)
        {
            return new InviteCodeDto()
            {
                Id = source.Id,
                ConferenceId = source.ConferenceId,
                Code = source.Code,
                Role = source.Role
            };
        }
    }
}
