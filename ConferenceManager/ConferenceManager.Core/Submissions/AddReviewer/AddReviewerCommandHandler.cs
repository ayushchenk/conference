using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.AddReviewer
{
    public class AddReviewerCommandHandler : DbContextRequestHandler<AddReviewerCommand>
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public AddReviewerCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper,
            UserManager<ApplicationUser> userManager) : base(context, currentUser, mapper)
        {
            _userManager = userManager;
        }

        public override async Task Handle(AddReviewerCommand request, CancellationToken cancellationToken)
        {
            var existingAssignment = await Context.SubmissionReviewers
                .FindAsync(new object[] { request.SubmissionId, request.UserId }, cancellationToken);

            if (existingAssignment != null)
            {
                return;
            }

            var submission = await Context.Submissions.FindAsync(request.SubmissionId, cancellationToken);

            if (submission == null)
            {
                throw new NotFoundException("Submission not found");
            }

            var user = await Context.Users
                .Include(u => u.ConferenceParticipations)
                .FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

            if (user == null)
            {
                throw new NotFoundException("User not found");
            }

            if (!user.IsParticipantOf(submission.Conference))
            {
                throw new ForbiddenException("User is not part of conference");
            }

            if (!await _userManager.IsInRoleAsync(user, ApplicationRole.Reviewer))
            {
                throw new ForbiddenException("User is not a reviewer");
            }

            var reviewAssignment = new SubmissionReviewer()
            {
                ReviewerId = user.Id,
                SubmissionId = submission.Id
            };

            Context.SubmissionReviewers.Add(reviewAssignment);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
