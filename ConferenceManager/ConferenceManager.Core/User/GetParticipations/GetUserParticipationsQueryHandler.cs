using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Conferences.Common;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.User.GetParticipations
{
    public class GetUserParticipationsQueryHandler : DbContextRequestHandler<GetUserParticipationsQuery, IEnumerable<ConferenceDto>>
    {
        public GetUserParticipationsQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<IEnumerable<ConferenceDto>> Handle(GetUserParticipationsQuery request, CancellationToken cancellationToken)
        {
            var user = await Context.Users
                .Include(u => u.ConferenceParticipations)
                .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            return user.ConferenceParticipations
                .OrderByDescending(c => c.EndDate)
                .Select(Mapper.Map<Conference, ConferenceDto>);
        }
    }
}
