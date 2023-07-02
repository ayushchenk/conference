using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Submissions.UpdateReview
{
    public class UpdateReviewCommandHandler : DbContextRequestHandler<UpdateReviewCommand, ReviewDto>
    {
        public UpdateReviewCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<ReviewDto> Handle(UpdateReviewCommand request, CancellationToken cancellationToken)
        {
            var review = Mapper.Map<UpdateReviewCommand, Review>(request);

            Context.Reviews.Update(review);
            await Context.SaveChangesAsync(cancellationToken);

            var updated = Context.Reviews
                .AsNoTracking()
                .Include(r => r.CreatedBy)
                .First(r => r.Id == review.Id);

            return Mapper.Map<Review, ReviewDto>(updated);
        }
    }
}
