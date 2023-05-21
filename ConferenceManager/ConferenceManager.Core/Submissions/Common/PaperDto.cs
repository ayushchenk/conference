﻿using ConferenceManager.Core.Common.Interfaces;

namespace ConferenceManager.Core.Submissions.Common
{
    public class PaperDto : IDto
    {
        public required int Id { set; get; }

        public required string FileName { set; get; }

        public required string Base64Content { set; get; }
    }
}
