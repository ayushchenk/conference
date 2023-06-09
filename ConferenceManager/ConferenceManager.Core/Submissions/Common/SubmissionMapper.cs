using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Humanizer;

namespace ConferenceManager.Core.Submissions.Common
{
    public class SubmissionMapper : IMapper<Submission, SubmissionDto>
    {
        private readonly ICurrentUserService _currentUser;

        public SubmissionMapper(ICurrentUserService currentUser)
        {
            _currentUser = currentUser;
        }

        public SubmissionDto Map(Submission source)
        {
            return new SubmissionDto()
            {
                Id = source.Id,
                Status = source.Status,
                StatusLabel = source.Status.Humanize(),
                AuthorId = source.CreatedById,
                AuthorEmail = source.CreatedBy.Email!,
                AuthorName = source.CreatedBy.FullName,
                ConferenceId = source.ConferenceId,
                Keywords = source.Keywords,
                Title = source.Title,
                Abstract = source.Abstract,
                CreatedOn = source.CreatedOn,
                ModifiedOn = source.ModifiedOn,
                IsReviewer = _currentUser.IsReviewerOf(source),
                IsAuthor = _currentUser.IsAuthorOf(source),
                IsParticipant = _currentUser.IsParticipantOf(source.Conference),
                IsValidForReturn = source.IsValidForReturn,
                IsValidForUpdate = source.IsValidForUpdate
            };
        }
    }
}
