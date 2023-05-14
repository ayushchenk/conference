using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.Common.Commands
{
    public abstract class CreateEntityCommand<TEntity> : IRequest<CreateEntityResponse> where TEntity : IDto
    {
        public TEntity Entity { get; }

        protected CreateEntityCommand(TEntity entity) 
        {
            Entity = entity;
        }
    }
}
