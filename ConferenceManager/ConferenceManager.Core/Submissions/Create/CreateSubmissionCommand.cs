using ConferenceManager.Core.Common.Commands;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.Submissions.Create
{
    public class CreateSubmissionCommand : ICreateEntityCommand
    {
        [Required]
        public int ConferenceId { set; get; }

        [Required]
        [MaxLength(100)]
        public string Title { set; get; } = null!;

        [Required]
        [MaxLength(100)]
        public string Keywords { set; get; } = null!;

        [Required]
        [MaxLength(1000)]
        public string Abstract { set; get; } = null!;

        [Required]
        [MaxLength(10)]
        public string[] ResearchAreas { set; get; } = null!;

        [Required]
        public IFormFile MainFile { set; get; } = null!;

        public IFormFile? PresentationFile { set; get; }

        public IFormFile? AnonymizedFile { set; get; }

        public IFormFile[]? OtherFiles { set; get; }
    }
}
