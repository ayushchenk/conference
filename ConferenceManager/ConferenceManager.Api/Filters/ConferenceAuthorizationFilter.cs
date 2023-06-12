﻿using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace ConferenceManager.Api.Filters
{
    public class ConferenceAuthorizationFilter : IAuthorizationFilter
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly ICurrentUserService _currentUser;
        private readonly string[] _roles;

        public ConferenceAuthorizationFilter(
            IApplicationDbContext dbContext,
            ICurrentUserService currentUser,
            string[] roles)
        {
            _dbContext = dbContext;
            _currentUser = currentUser;
            _roles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var hasHeader = context.HttpContext.Request.Headers.TryGetValue("x-conference-id", out var header);

            if (!hasHeader)
            {
                SetMissingHeaderResult(context);
                return;
            }

            var isParsed = int.TryParse(header.FirstOrDefault(), out var conferenceId);

            if (!isParsed)
            {
                SetInvalidHeaderResult(context);
                return;
            }

            var conference = _dbContext.Conferences.Find(conferenceId);

            if (conference == null)
            {
                SetConferenceNotFoundResult(context);
                return;
            }

            bool hasRole = false;

            foreach (var role in _roles)
            {
                if (role == ApplicationRole.Admin && _currentUser.IsAdmin)
                {
                    hasRole = true;
                    break;
                }

                if (_currentUser.HasRoleIn(conference, role))
                {
                    hasRole = true;
                    break;
                }
            }

            if (!hasRole)
            {
                SetForbiddenResult(context);
            }
        }

        private void SetMissingHeaderResult(AuthorizationFilterContext context)
        {
            context.Result = new BadRequestObjectResult(new ProblemDetails()
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Bad request",
                Detail = "Submission header is missing",
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1"
            });
        }

        private void SetInvalidHeaderResult(AuthorizationFilterContext context)
        {
            context.Result = new BadRequestObjectResult(new ProblemDetails()
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Bad request",
                Detail = "Submission header value is invalid",
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1"
            });
        }

        private void SetConferenceNotFoundResult(AuthorizationFilterContext context)
        {
            context.Result = new NotFoundObjectResult(new ProblemDetails()
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Not found",
                Detail = "Conference not found",
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4"
            });
        }

        private void SetForbiddenResult(AuthorizationFilterContext context)
        {
            var result = new ObjectResult(new ProblemDetails()
            {
                Status = StatusCodes.Status403Forbidden,
                Title = "Not found",
                Detail = "Conference not found",
                Type = "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3"
            });
            result.StatusCode = StatusCodes.Status401Unauthorized;
            context.Result = result;
        }
    }
}
