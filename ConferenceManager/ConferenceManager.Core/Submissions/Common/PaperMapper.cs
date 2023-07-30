using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Humanizer;

namespace ConferenceManager.Core.Submissions.Common
{
    public class PaperMapper : IMapper<Paper, PaperDto>
    {
        public PaperDto Map(Paper source)
        {
            return new PaperDto()
            {
                Id = source.Id,
                SubmissionId = source.SubmissionId,
                Type = source.Type,
                TypeLabel = source.Type.Humanize(),
                FileName = source.FileName,
                CreatedOn = source.CreatedOn
            };
        }
    }
}
