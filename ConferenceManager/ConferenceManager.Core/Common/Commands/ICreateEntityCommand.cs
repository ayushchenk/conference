using ConferenceManager.Core.Common.Model.Responses;
using MediatR;

namespace ConferenceManager.Core.Common.Commands
{
    public interface ICreateEntityCommand : IRequest<CreateEntityResponse>
    {
    }
}
