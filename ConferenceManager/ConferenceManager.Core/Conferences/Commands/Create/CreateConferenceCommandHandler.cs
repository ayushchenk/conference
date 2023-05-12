using AutoMapper;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.Commands.Create
{
    public class CreateConferenceCommandHandler : DbContextRequestHandler<CreateConferenceCommand, CreateResponse>
    {
        public CreateConferenceCommandHandler(IApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override async Task<CreateResponse> Handle(CreateConferenceCommand request, CancellationToken cancellationToken)
        {
            var conference = Mapper.Map<Conference>(request.Entity);

            Context.Conferences.Add(conference);

            await Context.SaveChangesAsync(cancellationToken);

            return new CreateResponse(conference.Id);
        }
    }
}
