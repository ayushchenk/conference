namespace ConferenceManager.Core.Common.Model.Responses
{
    public class UpdateEntityResponse
    {
        private static readonly UpdateEntityResponse _success = new UpdateEntityResponse(true);
        private static readonly UpdateEntityResponse _fail = new UpdateEntityResponse(false);

        public static UpdateEntityResponse Success => _success;
        public static UpdateEntityResponse Fail => _fail;

        public bool Updated { get; }

        private UpdateEntityResponse(bool updated)
        {
            Updated = updated;
        }
    }
}
