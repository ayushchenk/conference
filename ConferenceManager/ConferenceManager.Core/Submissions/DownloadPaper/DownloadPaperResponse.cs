namespace ConferenceManager.Core.Submissions.DownloadPaper
{
    public class DownloadPaperResponse
    {
        public required byte[] Bytes { get; init; }
        public required string FileName { get; init; }
        public required string FileNameBase64 { get; init; }
    }
}
