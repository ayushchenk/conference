using AutoMapper;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Commands.Create
{
    public class CreateConferenceCommandHandler : DbContextRequestHandler<CreateConferenceCommand, CreateEntityResponse>
    {
        public CreateConferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMapper mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<CreateEntityResponse> Handle(CreateConferenceCommand request, CancellationToken cancellationToken)
        {
            var conference = Mapper.Map<Conference>(request.Entity);

            var createdby = await Context.Users.FindAsync(CurrentUser.Id, cancellationToken);

            conference.Participants = new List<ApplicationUser>() { createdby! };

            Context.Conferences.Add(conference);

            await Context.SaveChangesAsync(cancellationToken);

            return new CreateEntityResponse(conference.Id);
        }
    }
}
