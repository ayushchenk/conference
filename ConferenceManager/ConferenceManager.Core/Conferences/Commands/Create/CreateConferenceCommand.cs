using ConferenceManager.Core.Common.Model;
using MediatR;

namespace ConferenceManager.Core.Conferences.Commands.Create
{
    public class CreateConferenceCommand : IRequest<CreateResponse>
    {
        public string Title { get; init; } = null!;

        public string Acronyn { get; init; } = null!;

        public string Organizer { get; init; } = null!;

        public DateTime StartDate { get; init; }

        public DateTime EndDate { get; init; }

        public string? Keywords { get; init; }

        public string? Abstract { get; init; }

        public string? Webpage { get; init; }

        public string? Venue { get; init; }

        public string? City { get; init; }

        public string? PrimaryResearchArea { get; init; }

        public string? SecondaryResearchArea { get; init; }

        public string? AreaNotes { get; init; }

        public string? OrganizerWebpage { get; init; }

        public string? ContactPhoneNumber { get; init; }
    }
}
