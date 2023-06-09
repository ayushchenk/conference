﻿using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Submissions.Common
{
    public class CommentDto : IDto
    {
        public required int Id { set; get; }

        public required int SubmissionId { set; get; }

        public required int AuthorId { set; get; }

        public required string AuthorName { set; get; }

        public required string Text { set; get; }

        public required DateTime CreatedOn { set; get; }

        public required DateTime ModifiedOn { set; get; }

        public bool IsModified => CreatedOn != ModifiedOn;

        public required bool IsAuthor { set; get; }
    }
}
