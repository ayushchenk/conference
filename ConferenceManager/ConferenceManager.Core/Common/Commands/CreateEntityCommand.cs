using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model;
using MediatR;

namespace ConferenceManager.Core.Common.Commands
{
    public abstract class CreateEntityCommand<TEntity> : IRequest<CreateResponse> where TEntity : IDto
    {
        public TEntity Entity { get; }

        protected CreateEntityCommand(TEntity entity) 
        {
            Entity = entity;
        }
    }
}
