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
        //private readonly IMapper<UpdateSubmissionCommand, Submission> _mapper;

        public UpdateSubmissionCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
            //_mapper = mapper;
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

            var newSubmission = Mapper.Map<UpdateSubmissionCommand, Submission>(request);
            newSubmission.Status = oldSubmission.Status;

            Context.Submissions.Update(newSubmission);
            await Context.SaveChangesAsync(cancellationToken);

            return new UpdateEntityResponse(true);
        }
    }
}
