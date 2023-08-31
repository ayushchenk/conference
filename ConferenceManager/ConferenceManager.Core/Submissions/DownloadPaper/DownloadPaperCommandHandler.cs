using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Interfaces;
using System.Text;

namespace ConferenceManager.Core.Submissions.DownloadPaper
{
    public class DownloadPaperCommandHandler : DbContextRequestHandler<DownloadPaperCommand, DownloadPaperResponse>
    {
        public DownloadPaperCommandHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser, 
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task<DownloadPaperResponse> Handle(DownloadPaperCommand request, CancellationToken cancellationToken)
        {
            var paper = await Context.Papers.FindAsync(request.PaperId, cancellationToken);

            var bytes = Encoding.UTF8.GetBytes(paper!.FileName);
            var encodedHeader = Convert.ToBase64String(bytes);

            return new DownloadPaperResponse()
            {
                Bytes = paper!.File,
                FileName = paper!.FileName,
                FileNameBase64 = encodedHeader
            };
        }
    }
}
