namespace ConferenceManager.Core.Common.Model.Responses
{
    public class DeleteEntityResponse
    {
        public bool Deleted { get; }

        public DeleteEntityResponse(bool deleted)
        {
            Deleted = deleted;
        }
    }
}
