namespace ConferenceManager.Core.Common.Model.Responses
{
    public class CreateEntityResponse
    {
        public int Id { get; }

        public CreateEntityResponse(int id)
        {
            Id = id;
        }
    }
}
