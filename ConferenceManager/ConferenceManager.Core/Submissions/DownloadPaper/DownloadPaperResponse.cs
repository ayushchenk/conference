namespace ConferenceManager.Core.Submissions.DownloadPaper
{
    public class DownloadPaperResponse
    {
        public required byte[] Bytes { get; init; }
        public required string FileName { get; init; }
    }
}
