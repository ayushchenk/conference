﻿using ConferenceManager.Core.Common.Validators;
using ConferenceManager.Core.Conferences.Common;

namespace ConferenceManager.Core.Conferences.Update
{
    public class UpdateConferenceCommandValidator : Validator<UpdateConferenceCommand>
    {
        public UpdateConferenceCommandValidator()
        {
            Include(new ConferenceCommandBaseValidator());

            RuleForId(x => x.Id);
        }
    }
}
