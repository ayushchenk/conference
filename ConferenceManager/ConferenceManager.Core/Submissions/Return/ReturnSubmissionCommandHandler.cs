using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Enums;

namespace ConferenceManager.Core.Submissions.Return
{
    public class ReturnSubmissionCommandHandler : DbContextRequestHandler<ReturnSubmissionCommand>
    {
        public ReturnSubmissionCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(ReturnSubmissionCommand request, CancellationToken cancellationToken)
        {
            var submission = await Context.Submissions.FindAsync(request.Id, cancellationToken);

            submission!.Status = SubmissionStatus.Returned;

            Context.Submissions.Update(submission);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
