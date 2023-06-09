﻿using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Submissions.RemovePreference
{
    public class RemoveReviewPreferenceCommandHandler : DbContextRequestHandler<RemoveReviewPreferenceCommand>
    {
        public RemoveReviewPreferenceCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(RemoveReviewPreferenceCommand request, CancellationToken cancellationToken)
        {
            var preference = await Context.ReviewPreferences
                .FindAsync(new object[] { request.SubmissionId, CurrentUser.Id }, cancellationToken);

            if (preference == null)
            {
                return;
            }

            Context.ReviewPreferences.Remove(preference);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
