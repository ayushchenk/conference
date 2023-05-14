namespace ConferenceManager.Core.Common.Model.Responses
{
    public class UpdateEntityResponse
    {
        public bool Updated { get; }

        public UpdateEntityResponse(bool updated)
        {
            Updated = updated;
        }
    }
}
