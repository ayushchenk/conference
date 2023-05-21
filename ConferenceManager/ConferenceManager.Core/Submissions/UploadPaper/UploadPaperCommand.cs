using ConferenceManager.Core.Common.Commands;
using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.Submissions.UpdatePaper
{
    public class UploadPaperCommand : IUpdateEntityCommand
    {
        public int Id { get; set; }

        public IFormFile File { get; set; } = null!;
    }
}
