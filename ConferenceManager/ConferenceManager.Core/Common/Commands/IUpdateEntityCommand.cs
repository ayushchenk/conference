using MediatR;

namespace ConferenceManager.Core.Common.Commands
{
    public interface IUpdateEntityCommand : IRequest
    {
        int Id { get; }
    }
}
