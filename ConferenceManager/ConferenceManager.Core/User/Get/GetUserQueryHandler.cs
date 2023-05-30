using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace ConferenceManager.Core.User.Get
{
    public class GetUserQueryHandler : DbContextRequestHandler<GetUserQuery, UserDto?>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public GetUserQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper,
            UserManager<ApplicationUser> userManager) : base(context, currentUser, mapper)
        {
            _userManager = userManager;
        }

        public override async Task<UserDto?> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var user = await Context.Users.FindAsync(request.Id, cancellationToken);

            if (user == null)
            {
                return null;
            }

            var dto = Mapper.Map<ApplicationUser, UserDto>(user);
            dto.Roles = await _userManager.GetRolesAsync(user);

            return dto;
        }
    }
}
