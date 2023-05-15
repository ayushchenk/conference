using ConferenceManager.Core.Common.Interfaces;
using MediatR;

namespace ConferenceManager.Core.Common.Queries
{
    public abstract class GetEntityQuery<TEntity> : IRequest<TEntity?> where TEntity : IDto
    {
        public int Id { get; }

        protected GetEntityQuery(int id)
        {
            Id = id;
        }
    }
}
