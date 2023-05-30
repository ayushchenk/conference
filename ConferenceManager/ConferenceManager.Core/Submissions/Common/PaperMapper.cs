using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

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
                FileName = source.FileName,
                Base64Content = Convert.ToBase64String(source.File)
            };
        }
    }
}
