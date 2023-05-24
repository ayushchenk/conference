using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Common
{
    public class SubmissionMapper : IMapper<Submission, SubmissionDto>
    {
        public SubmissionDto Map(Submission source)
        {
            return new SubmissionDto()
            {
                Id = source.Id,
                Status = source.Status,
                AuthorId = source.CreatedBy?.Id,
                AuthorEmail = source.CreatedBy?.Email ?? string.Empty,
                AuthorName = source.CreatedBy?.FullName ?? string.Empty,
                ConferenceId = source.ConferenceId,
                Keywords = source.Keywords,
                Title = source.Title,
                Abstract = source.Abstract
            };
        }
    }
}
