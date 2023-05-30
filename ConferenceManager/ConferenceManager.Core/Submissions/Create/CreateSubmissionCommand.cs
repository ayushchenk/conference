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
        public IFormFile File { set; get; } = null!;
    }
}
