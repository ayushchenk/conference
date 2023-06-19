using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.User.Get
{
    public class GetUserQueryHandler : DbContextRequestHandler<GetUserQuery, UserDto?>
    {
        public GetUserQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<UserDto?> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = await Context.Users.FindAsync(request.Id, cancellationToken);

            return Mapper.Map<ApplicationUser, UserDto>(user!);
        }
    }
}
