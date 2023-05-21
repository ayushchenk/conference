namespace ConferenceManager.Core.Common.Model.Responses
{
    public class DeleteEntityResponse
    {
        private static readonly DeleteEntityResponse _success = new DeleteEntityResponse(true);
        private static readonly DeleteEntityResponse _fail = new DeleteEntityResponse(false);

        public static DeleteEntityResponse Success => _success;
        public static DeleteEntityResponse Fail => _fail;

        public bool Deleted { get; }

        private DeleteEntityResponse(bool deleted)
        {
            Deleted = deleted;
        }
    }
}
