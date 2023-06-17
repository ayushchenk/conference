using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.UpdateReview
{
    public class UpdateReviewCommandHandler : DbContextRequestHandler<UpdateReviewCommand>
    {
        public UpdateReviewCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(UpdateReviewCommand request, CancellationToken cancellationToken)
        {
            var review = Mapper.Map<UpdateReviewCommand, Review>(request);

            Context.Reviews.Update(review);
            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
