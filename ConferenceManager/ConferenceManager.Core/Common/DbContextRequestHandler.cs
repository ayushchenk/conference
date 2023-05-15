﻿using AutoMapper;
using ConferenceManager.Core.Common.Interfaces;
using MediatR;

namespace ConferenceManager.Core.Common
{
    public abstract class DbContextRequestHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        protected IApplicationDbContext Context { get; }
        protected ICurrentUserService CurrentUser { get; }

        protected DbContextRequestHandler(IApplicationDbContext context, ICurrentUserService currentUser)
        {
            Context = context;
            CurrentUser = currentUser;
        }

        public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
    }
}
