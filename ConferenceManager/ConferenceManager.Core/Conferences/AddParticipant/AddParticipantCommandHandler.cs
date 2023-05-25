﻿using ConferenceManager.Core.Common;
using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConferenceManager.Core.Conferences.AddParticipant
{
    public class AddParticipantCommandHandler : DbContextRequestHandler<AddParticipantCommand>
    {
        public AddParticipantCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUser,
            IMappingHost mapper) : base(context, currentUser, mapper)
        {
        }

        public override async Task Handle(AddParticipantCommand request, CancellationToken cancellationToken)
        {
            var conference = await Context.Conferences.FindAsync(request.ConferenceId, cancellationToken);
            var user = await Context.Users.FindAsync(request.UserId, cancellationToken);

            if (user == null || conference == null)
            {
                throw new NotFoundException("User of conference not found");
            }

            var participation = await Context.ConferenceParticipants
                .FirstOrDefaultAsync(p => p.UserId == request.UserId && p.ConferenceId == request.ConferenceId);

            if (participation != null)
            {
                return;
            }

            Context.ConferenceParticipants.Add(new ConferenceParticipant()
            {
                ConferenceId = request.ConferenceId,
                UserId = request.UserId,
            });

            await Context.SaveChangesAsync(cancellationToken);
        }
    }
}
