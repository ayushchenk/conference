using AutoMapper;
using ConferenceManager.Core.Conferences.Commands.Create;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Mappings
{
    public class ConferenceProfile : Profile
    {
        public ConferenceProfile()
        {
            CreateMap<CreateConferenceCommand, Conference>();
        }
    }
}
