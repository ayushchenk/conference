using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Util;
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
                Acronym = source.Acronym,
                Organizer = source.Organizer,
                StartDate = source.StartDate,
                EndDate = source.EndDate,
                Abstract = source.Abstract,
                City = source.City,
                AreaNotes = source.AreaNotes,
                ContactPhoneNumber = source.ContactPhoneNumber,
                Keywords = source.Keywords,
                OrganizerWebpage = source.OrganizerWebpage,
                ResearchAreas = string.Join(Conference.ResearchAreasSeparator, source.ResearchAreas),
                Venue = source.Venue,
                Webpage = source.Webpage,
                IsAnonymizedFileRequired = source.IsAnonymizedFileRequired,
                AuthorInviteCode = Password.Generate(10, 3),
                ReviewerInviteCode = Password.Generate(10, 3),
                ChairInviteCode = Password.Generate(10, 3),
                Participants = new List<ApplicationUser>()
            };
        }
    }
}
