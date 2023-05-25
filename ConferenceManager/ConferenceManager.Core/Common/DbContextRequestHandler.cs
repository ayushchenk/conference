using ConferenceManager.Core.Common.Interfaces;
using MediatR;

namespace ConferenceManager.Core.Common
{
    public abstract class DbContextRequestHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        protected IApplicationDbContext Context { get; }
        protected ICurrentUserService CurrentUser { get; }
        protected IMappingHost Mapper { get; }

        protected DbContextRequestHandler(IApplicationDbContext context, ICurrentUserService currentUser, IMappingHost mapper)
        {
            Context = context;
            CurrentUser = currentUser;
            Mapper = mapper;
        }

        public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
    }

    public abstract class DbContextRequestHandler<TRequest> : IRequestHandler<TRequest> where TRequest : IRequest
    {
        protected IApplicationDbContext Context { get; }
        protected ICurrentUserService CurrentUser { get; }
        protected IMappingHost Mapper { get; }

        protected DbContextRequestHandler(IApplicationDbContext context, ICurrentUserService currentUser, IMappingHost mapper)
        {
            Context = context;
            CurrentUser = currentUser;
            Mapper = mapper;
        }

        public abstract Task Handle(TRequest request, CancellationToken cancellationToken);
    }
}
