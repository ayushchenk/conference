using ConferenceManager.Core.Common.Commands;
using ConferenceManager.Core.Common.Model.Dtos;

namespace ConferenceManager.Core.Conferences.Commands.Update
{
    public class UpdateConferenceCommand : UpdateEntityCommand<ConferenceDto>
    {
        public UpdateConferenceCommand(ConferenceDto entity) : base(entity)
        {
        }
    }
}
