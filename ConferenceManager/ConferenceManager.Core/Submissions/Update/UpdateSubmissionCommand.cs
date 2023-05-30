using ConferenceManager.Core.Common.Commands;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.Submissions.Update
{
    public class UpdateSubmissionCommand : IUpdateEntityCommand
    {
        [Required]
        public int Id { set; get; }

        [Required]
        [MaxLength(100)]
        public string Title { set; get; } = null!;

        [Required]
        [MaxLength(100)]
        public string Keywords { set; get; } = null!;

        [Required]
        [MaxLength(1000)]
        public string Abstract { set; get; } = null!;

        public IFormFile? File { set; get; }
    }
}
