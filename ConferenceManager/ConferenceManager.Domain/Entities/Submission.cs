﻿using ConferenceManager.Domain.Common;
using ConferenceManager.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConferenceManager.Domain.Entities
{
    public class Submission : BaseAuditableEntity
    {
        public int ConferenceId { set; get; }

        public required string Title { set; get; }

        public required string Keywords { set; get; }

        public required string Abstract { set; get; }

        public required SubmissionStatus Status { set; get; }

        public virtual Conference Conference { set; get; } = null!;

        [NotMapped]
        public bool IsValidForReturn => Status == SubmissionStatus.Created || Status == SubmissionStatus.Updated;

        [NotMapped]
        public bool IsValidForUpdate => Status == SubmissionStatus.Returned;

        public virtual IList<ApplicationUser> ActualReviewers { set; get; } = null!;

        public virtual IList<ApplicationUser> AppliedReviewers { set; get; } = null!;

        public virtual IList<Review> Reviews { set; get; } = null!;

        public virtual IList<Comment> Comments { set; get; } = null!;

        public virtual IList<Paper> Papers { set; get; } = null!;
    }
}
