﻿using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommandMapper : IMapper<UpdateConferenceCommand, Conference>
    {
        public Conference Map(UpdateConferenceCommand source)
        {
            return new Conference()
            {
                Id = source.Id,
                Title = source.Title,
                Acronyn = source.Acronym,
                Organizer = source.Organizer,
                StartDate = source.StartDate,
                EndDate = source.EndDate,
                Abstract = source.Abstract,
                City = source.City,
                AreaNotes = source.AreaNotes,
                ContactPhoneNumber = source.ContactPhoneNumber,
                Keywords = source.Keywords,
                OrganizerWebpage = source.OrganizerWebpage,
                PrimaryResearchArea = source.PrimaryResearchArea,
                SecondaryResearchArea = source.SecondaryResearchArea,
                Venue = source.Venue,
                Webpage = source.Webpage
            };
        }
    }
}