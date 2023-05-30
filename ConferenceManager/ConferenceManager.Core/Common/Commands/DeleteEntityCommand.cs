using MediatR;

namespace ConferenceManager.Core.Common.Commands
{
    public abstract class DeleteEntityCommand : IRequest
    {
        public int Id { get; }

        protected DeleteEntityCommand(int id)
        {
            Id = id;
        }
    }
}
