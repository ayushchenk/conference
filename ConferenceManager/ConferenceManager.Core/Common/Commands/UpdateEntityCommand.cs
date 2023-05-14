using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.Common.Commands
{
    public abstract class UpdateEntityCommand<TEntity> : IRequest<UpdateEntityResponse> where TEntity : IDto
    {
        public TEntity Entity { get; }

        protected UpdateEntityCommand(TEntity entity)
        {
            Entity = entity;
        }
    }
}
