using AutoMapper;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Dtos;

namespace ConferenceManager.Core.Conferences.Commands.Get
{
    public class GetConferenceQueryHandler : DbContextRequestHandler<GetConferenceQuery, ConferenceDto>
    {
        public GetConferenceQueryHandler(IApplicationDbContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public override async Task<ConferenceDto> Handle(GetConferenceQuery request, CancellationToken cancellationToken)
        {
            var conference = await Context.Conferences.FindAsync(request.Id);

            if(conference == null)
            {
                return null!;
            }

            return Mapper.Map<ConferenceDto>(conference);
        }
    }
}
