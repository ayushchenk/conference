﻿using ConferenceManager.Core.Common.Exceptions;
using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Validators;
using FluentValidation;

namespace ConferenceManager.Core.User.UnassignAdminRole
{
    public class UnassignAdminRoleCommandValidator : DbContextValidator<UnassignAdminRoleCommand>
    {
        public UnassignAdminRoleCommandValidator(IApplicationDbContext context, ICurrentUserService currentUser) : base(context, currentUser)
        {
            RuleForId(x => x.Id);
            RuleFor(x => x).CustomAsync(async (command, context, token) =>
            {
                var user = await Context.Users.FindAsync(command.Id);

                if (user == null)
                {
                    context.AddException(new NotFoundException("User not found"));
                }
            });
        }
    }
}
