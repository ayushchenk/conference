using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Submissions.CloseSubmission
{
    public class CloseSubmissionCommandHandler : DbContextRequestHandler<CloseSubmissionCommand>
    {
        public CloseSubmissionCommandHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(CloseSubmissionCommand request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.SubmissionId);

            submission!.Status = request.Status;

            Context.Submissions.Update(submission);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
