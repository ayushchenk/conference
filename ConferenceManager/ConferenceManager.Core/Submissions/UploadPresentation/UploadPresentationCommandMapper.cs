using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using ConferenceManager.Domain.Enums;

namespace ConferenceManager.Core.Submissions.UploadPresentation
{
    public class UploadPresentationCommandMapper : IMapper<UploadPresentationCommand, Paper>
    {
        public Paper Map(UploadPresentationCommand source)
        {
            return new Paper()
            {
                SubmissionId = source.SubmissionId,
                File = source.File.ToBytes(),
                FileName = source.File.FileName,
                Type = PaperType.Presentation
            };
        }
    }
}
