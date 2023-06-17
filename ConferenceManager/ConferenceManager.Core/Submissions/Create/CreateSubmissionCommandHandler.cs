using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Create
{
    public class CreateSubmissionCommandHandler : DbContextRequestHandler<CreateSubmissionCommand, CreateEntityResponse>
    {
        public CreateSubmissionCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<CreateEntityResponse> Handle(CreateSubmissionCommand request, CancellationToken cancellationToken)
        {
            var submission = Mapper.Map<CreateSubmissionCommand, Submission>(request);

            Context.Submissions.Add(submission);
            await Context.SaveChangesAsync(cancellationToken);

            return new CreateEntityResponse(submission.Id);
        }
    }
}
