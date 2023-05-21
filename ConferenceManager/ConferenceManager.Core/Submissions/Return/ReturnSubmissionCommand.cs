using ConferenceManager.Core.Common.Commands;

namespace ConferenceManager.Core.Submissions.Return
{
    public class ReturnSubmissionCommand : IUpdateEntityCommand
    {
        public int Id { get; set; }

        public ReturnSubmissionCommand(int id)
        {
            Id = id;
        }
    }
}
