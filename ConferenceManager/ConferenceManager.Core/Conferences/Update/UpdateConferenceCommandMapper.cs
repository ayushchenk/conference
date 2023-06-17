using ConferenceManager.Core.Common.Interfaces;
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
                AuthorInviteCode = null!,
                ChairInviteCode = null!,
                ReviewerInviteCode = null!,
                IsAnonymizedFileRequired = source.IsAnonymizedFileRequired
            };
        }
    }
}
