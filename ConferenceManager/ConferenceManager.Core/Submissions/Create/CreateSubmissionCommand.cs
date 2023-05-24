﻿using ConferenceManager.Core.Common.Commands;
using Microsoft.AspNetCore.Http;

namespace ConferenceManager.Core.Submissions.Create
{
    public class CreateSubmissionCommand : ICreateEntityCommand
    {
        public int ConferenceId { set; get; }

        public string Title { set; get; } = null!;

        public string Keywords { set; get; } = null!;

        public string Abstract { set; get; } = null!;

        public IFormFile File { set; get; } = null!;
    }
}