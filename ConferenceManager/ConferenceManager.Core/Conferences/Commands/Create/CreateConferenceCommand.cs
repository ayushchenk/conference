﻿using ConferenceManager.Core.Common.Commands;
using ConferenceManager.Core.Common.Model.Dtos;

namespace ConferenceManager.Core.Conferences.Commands.Create
{
    public class CreateConferenceCommand : CreateEntityCommand<ConferenceDto>
    {
        public CreateConferenceCommand(ConferenceDto conference) : base(conference) 
        {
        }
    }
}
