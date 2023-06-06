﻿using ConferenceManager.Core.Common.Commands;
using ConferenceManager.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ConferenceManager.Core.Submissions.UpdateReview
{
    public class UpdateReviewCommand : IUpdateEntityCommand
    {
        public int Id { get; set; }

        [JsonIgnore]
        public int SubmissionId { set; get; }

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