using AutoMapper;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Domain.Entities;
using MediatR;

namespace ConferenceManager.Core.Conferences.Commands.Create
{
    public class CreateConferenceCommandHandler : IRequestHandler<CreateConferenceCommand, CreateResponse>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CreateConferenceCommandHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CreateResponse> Handle(CreateConferenceCommand request, CancellationToken cancellationToken)
        {
            var conference = _mapper.Map<Conference>(request);

            _context.Conferences.Add(conference);

            await _context.SaveChangesAsync(cancellationToken);

            return new CreateResponse(conference.Id);
        }
    }
}
