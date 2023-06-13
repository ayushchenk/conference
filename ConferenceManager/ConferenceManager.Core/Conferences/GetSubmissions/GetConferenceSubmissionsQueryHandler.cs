using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.GetSubmissions
{
    public class GetConferenceSubmissionsQueryHandler : DbContextRequestHandler<GetConferenceSubmissionsQuery, EntityPageResponse<SubmissionDto>>
    {
        public GetConferenceSubmissionsQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<EntityPageResponse<SubmissionDto>> Handle(GetConferenceSubmissionsQuery request, CancellationToken cancellationToken)
        {
            var source = await GetSourceQuery(request.ConferenceId);

            var page = await PaginatedList<Submission>.CreateAsync(source, request.PageIndex, request.PageSize);

            return new EntityPageResponse<SubmissionDto>()
            {
                Items = page.Items.Select(Mapper.Map<Submission, SubmissionDto>),
                TotalCount = page.TotalCount,
                TotalPages = page.TotalPages
            };
        }

        private async Task<IQueryable<Submission>> GetSourceQuery(int conferenceId)
        {
            var conference = await Context.Conferences.FindAsync(conferenceId);

            if (CurrentUser.IsReviewerIn(conference!) || CurrentUser.IsAdmin)
            {
                return Context.Submissions
                    .Where(s => s.ConferenceId == conferenceId)
                    .OrderByDescending(s => s.CreatedOn);
            }

            return Context.Submissions
                .Where(s => s.CreatedById == CurrentUser.Id)
                .Where(s => s.ConferenceId == conferenceId)
                .OrderByDescending(s => s.CreatedOn);
        }
    }
}
