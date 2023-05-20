using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Submissions.UpdatePaper;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.UploadPaper
{
    public class UploadPaperCommandHandler : DbContextRequestHandler<UploadPaperCommand, UpdateEntityResponse>
    {
        public UploadPaperCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<UpdateEntityResponse> Handle(UploadPaperCommand request, CancellationToken cancellationToken)
        {
            var paper = Mapper.Map<UploadPaperCommand, Paper>(request);

            var submission = await Context.Submissions.FindAsync(paper.SubmissionId, cancellationToken);

            if (submission == null)
            {
                throw new NotFoundException("Submission not found");
            }

            if (submission.CreatedById != CurrentUser.Id)
            {
                throw new ForbiddenException("Cannot upload to others submissions");
            }

            submission.Papers.Add(paper);
            await Context.SaveChangesAsync(cancellationToken);

            return new UpdateEntityResponse(true);
        }
    }
}
