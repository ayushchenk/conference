﻿using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.AddPreference
{
    public class AddreviewPreferenceCommandHandler : DbContextRequestHandler<AddReviewPreferenceCommand>
    {
        public AddreviewPreferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(AddReviewPreferenceCommand request, CancellationToken cancellationToken)
        {
            var existingPreference = await Context.ReviewPreferences
                .FindAsync(new object[] { request.SubmissionId, CurrentUser.Id }, cancellationToken);

            if (existingPreference != null)
            {
                return;
            }

            var newPreference = new ReviewPreference()
            {
                ReviewerId = CurrentUser.Id,
                SubmissionId = request.SubmissionId
            };

            Context.ReviewPreferences.Add(newPreference);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
