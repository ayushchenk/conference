using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.User.GetSubmissions
{
    public class GetUserSubmissionsQueryHandler : DbContextRequestHandler<GetUserSubmissionsQuery, IEnumerable<SubmissionDto>>
    {
        public GetUserSubmissionsQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<IEnumerable<SubmissionDto>> Handle(GetUserSubmissionsQuery request, CancellationToken cancellationToken)
        {
            var user = await Context.Users
                .Include(u => u.CreatedSubmissions)
                .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            return user.CreatedSubmissions
                .OrderByDescending(s => s.CreatedOn)
                .Select(Mapper.Map<Submission, SubmissionDto>);
        }
    }
}
