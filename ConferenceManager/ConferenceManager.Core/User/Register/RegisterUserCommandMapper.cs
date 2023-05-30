using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.User.Register
{
    public class RegisterUserCommandMapper : IMapper<RegisterUserCommand, ApplicationUser>
    {
        public ApplicationUser Map(RegisterUserCommand source)
        {
            return new ApplicationUser()
            {
                Affiliation = source.Affiliation,
                Country = source.Country,
                FirstName = source.FirstName,
                LastName = source.LastName,
                Email = source.Email,
                UserName = source.Email,
                Webpage = source.Webpage
            };
        }
    }
}
