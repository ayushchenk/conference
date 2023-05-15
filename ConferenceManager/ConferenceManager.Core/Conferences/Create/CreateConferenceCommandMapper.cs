using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Create
{
    public class CreateConferenceCommandMapper : IMapper<CreateConferenceCommand, Conference>
    {
        public Conference Map(CreateConferenceCommand source)
        {
            return new Conference()
            {
                Title = source.Title,
                Acronyn = source.Acronyn,
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
                Webpage = source.Webpage,
                Participants = new List<ApplicationUser>()
            };
        }
    }
}
