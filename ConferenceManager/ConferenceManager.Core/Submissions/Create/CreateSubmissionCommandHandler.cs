using AutoMapper;
using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Create
{
    public class CreateSubmissionCommandHandler : DbContextRequestHandler<CreateSubmissionCommand, CreateEntityResponse>
    {
        private readonly IMapper<CreateSubmissionCommand, Submission> _mapper;

        public CreateSubmissionCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMapper mapper,
            IMapper<CreateSubmissionCommand, Submission> customMapper) : base(context, currentUser, mapper)
        {
            _mapper = customMapper;
        }

        public override async Task<CreateEntityResponse> Handle(CreateSubmissionCommand request, CancellationToken cancellationToken)
        {
            var confParticipants = Context.ConferenceParticipants
                .Where(part => part.ConferenceId == request.ConferenceId)
                .Select(part => part.User.Id);

            if (!confParticipants.Contains(CurrentUser.Id))
            {
                throw new ForbiddenException("Can only upload submissions to participating conferences");
            }

            var submission = _mapper.Map(request);

            Context.Submissions.Add(submission);
            await Context.SaveChangesAsync(cancellationToken);

            return new CreateEntityResponse(submission.Id);
        }
    }
}
