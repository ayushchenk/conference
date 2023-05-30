using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;


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
            var submission = Mapper.Map<UpdateSubmissionCommand, Submission>(request);

            Context.Submissions.Update(submission);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
