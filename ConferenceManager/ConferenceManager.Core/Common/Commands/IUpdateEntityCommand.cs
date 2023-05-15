using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.Common.Commands
{
    public interface IUpdateEntityCommand : IRequest<UpdateEntityResponse>
    {
        int Id { set; get; }
    }
}
