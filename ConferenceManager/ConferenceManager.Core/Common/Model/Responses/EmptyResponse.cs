namespace ConferenceManager.Core.Common.Model.Responses
{
    public class EmptyResponse
    {
        private static readonly EmptyResponse _value = new EmptyResponse();

        public static EmptyResponse Value => _value;

        private EmptyResponse() 
        {
        }
    }
}
