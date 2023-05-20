using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Submissions.UpdatePaper;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.UploadPaper
{
    public class UploadPaperCommandMapper : IMapper<UploadPaperCommand, Paper>
    {
        public Paper Map(UploadPaperCommand source)
        {
            return new Paper()
            {
                File = source.File.ToBytes(),
                FileName = source.File.FileName,
                SubmissionId = source.Id
            };
        }
    }
}
