﻿using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Submissions.Common;

namespace ConferenceManager.Core.Conferences.GetSubmissions
{
    public class GetConferenceSubmissionsQueryValidator : Validator<GetConferenceSubmissionsQuery>
    {
        public GetConferenceSubmissionsQueryValidator()
        {
            Include(new EntityPageQueryValidator<SubmissionDto>());
        }
    }
}
