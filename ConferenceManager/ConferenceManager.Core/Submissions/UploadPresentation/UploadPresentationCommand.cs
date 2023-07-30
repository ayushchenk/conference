using MediatR;
using Microsoft.AspNetCore.Http;

namespace ConferenceManager.Core.Submissions.UploadPresentation
{
    public class UploadPresentationCommand : IRequest
    {
        public int SubmissionId { set; get; }
        public IFormFile File { set; get; } = null!;
    }
}
