using AutoMapper;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Conferences.Create;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommandHandler : DbContextRequestHandler<UpdateConferenceCommand, UpdateEntityResponse>
    {
        private readonly IMapper<UpdateConferenceCommand, Conference> _mapper;

        public UpdateConferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMapper mapper,
            IMapper<UpdateConferenceCommand, Conference> commonMapper) : base(context, currentUser, mapper)
        {
            _mapper = commonMapper;
        }

        public override async Task<UpdateEntityResponse> Handle(UpdateConferenceCommand request, CancellationToken cancellationToken)
        {
            var oldConference = await Context.Conferences
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

            if (oldConference == null)
            {
                throw new NotFoundException();
            }

            var participantIds = Context.ConferenceParticipants
                .Where(c => c.ConferenceId == request.Id)
                .Select(c => c.UserId);

            if (!CurrentUser.IsGlobalAdmin && !participantIds.Contains(CurrentUser.Id))
            {
                throw new ForbiddenException();
            }

            var newConference = _mapper.Map(request);

            Context.Conferences.Update(newConference);
            await Context.SaveChangesAsync(cancellationToken);

            return new UpdateEntityResponse(true);
        }
    }
}
