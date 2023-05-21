using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.User.Common
{
    public class UserDtoMapper : IMapper<ApplicationUser, UserDto>
    {
        public UserDto Map(ApplicationUser source)
        {
            return new UserDto()
            {
                Id = source.Id,
                FullName = source.FullName,
                Email = source.Email!,
                Affiliation = source.Affiliation,
                Country = source.Country,
                Webpage = source.Webpage,
                Roles = Enumerable.Empty<string>()
            };
        }
    }
}
