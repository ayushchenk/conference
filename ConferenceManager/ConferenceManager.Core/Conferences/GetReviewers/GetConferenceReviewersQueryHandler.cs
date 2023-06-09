﻿using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Conferences.GetReviewers
{
    public class GetConferenceReviewersQueryHandler : DbContextRequestHandler<GetConferenceReviewersQuery, IEnumerable<UserDto>>
    {
        public GetConferenceReviewersQueryHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<IEnumerable<UserDto>> Handle(GetConferenceReviewersQuery request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.SubmissionId, cancellationToken);

            var allReviewersIds = Context.UserRoles
                .Where(r => r.ConferenceId == request.ConferenceId && r.Role.Name == ApplicationRole.Reviewer)
                .Select(r => r.UserId)
                .ToArray();

            var assignedReviewersIds = Context.SubmissionReviewers
                .Where(sr => sr.SubmissionId == request.SubmissionId)
                .Select(sr => sr.ReviewerId)
                .ToArray();

            var unassignedReviewersIds = allReviewersIds
                .Except(assignedReviewersIds)
                .Except(new int[] { submission?.CreatedById ?? 0 });

            var reviewers = Context.Users
                .Where(u => unassignedReviewersIds.Contains(u.Id))
                .OrderBy(u => u.Id)
                .Select(Mapper.Map<ApplicationUser, UserDto>)
                .ToArray();

            foreach (var user in reviewers)
            {
                var preference = await Context.ReviewPreferences
                    .FindAsync(new object[] { request.SubmissionId, user.Id }, cancellationToken);
                user.HasPreference = preference != null;
            }

            return reviewers;
        }
    }
}
