using AutoMapper;
using ConferenceManager.Core.Account.Commands.Register;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Common.Mappings
{
    public class ApplicationUserProfile : Profile
    {
        public ApplicationUserProfile()
        {
            CreateMap<RegisterUserCommand, ApplicationUser>()
                .ForMember(user => user.UserName,
                    options => options.MapFrom(command => command.Email));
        }
    }
}
