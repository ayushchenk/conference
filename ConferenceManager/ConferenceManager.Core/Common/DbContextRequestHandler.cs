using AutoMapper;
using ConferenceManager.Core.Common.Interfaces;
using MediatR;

namespace ConferenceManager.Core.Common
{
    public abstract class DbContextRequestHandler<TRequest, TResponse> : IRequestHandler<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        protected IApplicationDbContext Context { get; }
        protected ICurrentUserService CurrentUser { get; }
        protected IMapper Mapper { get; }

        protected DbContextRequestHandler(
            IApplicationDbContext context, 
            ICurrentUserService currentUser,
            IMapper mapper
            )
        {
            Context = context;
            Mapper = mapper;
            CurrentUser = currentUser;
        }

        public abstract Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken);
    }
}
