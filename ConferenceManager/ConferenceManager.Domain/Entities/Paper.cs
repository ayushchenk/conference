﻿using ConferenceManager.Domain.Common;

namespace ConferenceManager.Domain.Entities
{
    public class Paper : BaseAuditableEntity
    {
        public required int SubmissionId { set; get; }

        public required byte[] File { set; get; }

        public required string FileName { set; get; }

        public virtual Submission Submission { set; get; } = null!;
    }
}
