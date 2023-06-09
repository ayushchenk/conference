﻿using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Common
{
    public class ConferenceDtoMapper : IMapper<Conference, ConferenceDto>
    {
        public ConferenceDto Map(Conference source)
        {
            return new ConferenceDto()
            {
                Id = source.Id,
                Abstract = source.Abstract,
                Acronym = source.Acronym,
                AreaNotes = source.AreaNotes,
                City = source.City,
                ContactPhoneNumber = source.ContactPhoneNumber,
                EndDate = source.EndDate,
                Keywords = source.Keywords,
                Organizer = source.Organizer,
                OrganizerWebpage = source.OrganizerWebpage,
                ResearchAreas = source.ResearchAreas.Split(Conference.ResearchAreasSeparator, StringSplitOptions.RemoveEmptyEntries),
                StartDate = source.StartDate,
                Title = source.Title,
                Venue = source.Venue,
                Webpage = source.Webpage,
                IsAnonymizedFileRequired = source.IsAnonymizedFileRequired
            };
        }
    }
}
