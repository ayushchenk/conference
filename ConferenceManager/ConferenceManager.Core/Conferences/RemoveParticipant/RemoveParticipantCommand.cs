﻿using MediatR;

namespace ConferenceManager.Core.Conferences.RemoveParticipant
{
    public class RemoveParticipantCommand : IRequest
    {
        public int ConferenceId { get; }

        public int UserId { get; }

        public RemoveParticipantCommand(int conferenceId, int userId)
        {
            ConferenceId = conferenceId;
            UserId = userId;
        }
    }
}
