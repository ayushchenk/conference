using MediatR;

namespace ConferenceManager.Core.Submissions.DownloadPaper
{
    public class DownloadPaperCommand : IRequest<DownloadPaperResponse>
    {
        public int PaperId { get; }

        public DownloadPaperCommand(int paperId)
        {
            PaperId = paperId;
        }
    }
}
