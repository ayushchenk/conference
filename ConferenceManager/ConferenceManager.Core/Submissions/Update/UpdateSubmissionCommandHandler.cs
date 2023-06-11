using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.Update
{
    public class UpdateSubmissionCommandHandler : DbContextRequestHandler<UpdateSubmissionCommand>
    {
        public UpdateSubmissionCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(UpdateSubmissionCommand request, CancellationToken cancellationToken)
        {
            var oldSubmission = await Context.Submissions
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

            var submission = Mapper.Map<UpdateSubmissionCommand, Submission>(request);

            if (oldSubmission!.Status == SubmissionStatus.Created)
            {
                submission.Status = SubmissionStatus.Created;
            }

            Context.Submissions.Update(submission);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
