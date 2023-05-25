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

            var reviewAssignment = new SubmissionReviewer()
            {
                ReviewerId = request.UserId,
                SubmissionId = request.SubmissionId
            };

            Context.SubmissionReviewers.Add(reviewAssignment);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
