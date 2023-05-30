using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.CreateReview
{
    public class CreateReviewCommandHandler : DbContextRequestHandler<CreateReviewCommand, CreateEntityResponse>
    {
        public CreateReviewCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<CreateEntityResponse> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            var review = Mapper.Map<CreateReviewCommand, Review>(request);

            Context.Reviews.Add(review);
            await Context.SaveChangesAsync(cancellationToken);

            return new CreateEntityResponse(review.Id);
        }
    }
}
