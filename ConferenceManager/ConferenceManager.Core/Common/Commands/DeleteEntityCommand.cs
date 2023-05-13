using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.Common.Commands
{
    public abstract class DeleteEntityCommand : IRequest<DeleteEntityResponse>
    {
        public int Id { get; }

        protected DeleteEntityCommand(int id)
        {
            Id = id;
        }
    }
}
