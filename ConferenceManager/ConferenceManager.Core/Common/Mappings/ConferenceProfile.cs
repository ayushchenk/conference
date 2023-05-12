using AutoMapper;
using ConferenceManager.Core.Common.Model.Dtos;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Common.Mappings
{
    public class ConferenceProfile : Profile
    {
        public ConferenceProfile()
        {
            CreateMap<ConferenceDto, Conference>().ReverseMap();
        }
    }
}
