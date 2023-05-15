using AutoMapper;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Create
{
    public class CreateConferenceCommandHandler : DbContextRequestHandler<CreateConferenceCommand, CreateEntityResponse>
    {
        private readonly IMapper<CreateConferenceCommand, Conference> _mapper;

        public CreateConferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMapper<CreateConferenceCommand, Conference> mapper) : base(context, currentUser)
        {
            _mapper = mapper;
        }

        public override async Task<CreateEntityResponse> Handle(CreateConferenceCommand request, CancellationToken cancellationToken)
        {
            var conference = _mapper.Map(request);

            var createdby = await Context.Users.FindAsync(CurrentUser.Id, cancellationToken);

            conference.Participants.Add(createdby!);

            Context.Conferences.Add(conference);

            await Context.SaveChangesAsync(cancellationToken);

            return new CreateEntityResponse(conference.Id);
        }
    }
}
