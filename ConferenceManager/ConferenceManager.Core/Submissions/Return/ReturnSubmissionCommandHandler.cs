﻿using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Enums;

namespace ConferenceManager.Core.Submissions.Return
{
    public class ReturnSubmissionCommandHandler : DbContextRequestHandler<ReturnSubmissionCommand, UpdateEntityResponse>
    {
        public ReturnSubmissionCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<UpdateEntityResponse> Handle(ReturnSubmissionCommand request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.Id, cancellationToken);

            if (submission == null)
            {
                throw new NotFoundException();
            }

            if (submission.Status != SubmissionStatus.Created
                && submission.Status != SubmissionStatus.Updated)
            {
                throw new ForbiddenException("Can only return created or updated submissions");
            }

            var reviewers = Context.SubmissionReviewers
                .Where(sr => sr.SubmissionId == submission.Id)
                .Select(sr => sr.ReviewerId);

            if (!reviewers.Contains(CurrentUser.Id))
            {
                throw new ForbiddenException("Can only return reviewing submissions");
            }

            submission.Status = SubmissionStatus.Returned;

            Context.Submissions.Update(submission);
            await Context.SaveChangesAsync(cancellationToken);

            return UpdateEntityResponse.Success;
        }
    }
}
