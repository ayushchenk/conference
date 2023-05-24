﻿using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Enums;

namespace ConferenceManager.Core.Submissions.Common
{
    public class SubmissionDto : IDto
    {
        public required int Id { set; get; }

        public required int ConferenceId { set; get; }

        public required SubmissionStatus Status { set; get; }

        public required int? AuthorId { set; get; }

        public required string AuthorEmail { set; get; }

        public required string AuthorName { set; get; }

        public required string Title { set; get; }

        public required string Keywords { set; get; } 

        public required string Abstract { set; get; }
    }
}