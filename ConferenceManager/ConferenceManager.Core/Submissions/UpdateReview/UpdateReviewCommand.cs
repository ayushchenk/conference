using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Domain.Enums;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace ConferenceManager.Core.Submissions.UpdateReview
{
    public class UpdateReviewCommand : IRequest<ReviewDto>
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Evaluation { get; init; } = null!;

        [Required]
        [Range(-10, 10)]
        public sbyte Score { get; init; }

        [Required]
        public ReviewConfidence Confidence { get; init; }
    }
}
