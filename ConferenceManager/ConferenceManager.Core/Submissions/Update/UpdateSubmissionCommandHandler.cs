using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.Update
{
    public class UpdateSubmissionCommandHandler : DbContextRequestHandler<UpdateSubmissionCommand, UpdateEntityResponse>
    {
        public UpdateSubmissionCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<UpdateEntityResponse> Handle(UpdateSubmissionCommand request, CancellationToken cancellationToken)
        {
            var oldSubmission = await Context.Submissions
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);

            if (oldSubmission == null)
            {
                throw new NotFoundException();
            }

            if (oldSubmission.Status != Domain.Enums.SubmissionStatus.Returned)
            {
                throw new ForbiddenException("Can only update returned submissions");
            }

            var newSubmission = Mapper.Map<UpdateSubmissionCommand, Submission>(request);

            Context.Submissions.Update(newSubmission);
            await Context.SaveChangesAsync(cancellationToken);

            return UpdateEntityResponse.Success;
        }
    }
}
