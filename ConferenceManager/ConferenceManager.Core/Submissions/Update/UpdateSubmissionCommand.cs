using ConferenceManager.Core.Common.Commands;

namespace ConferenceManager.Core.Submissions.Update
{
    public class UpdateSubmissionCommand : IUpdateEntityCommand
    {
        public int Id { set; get; }

        public string Title { set; get; } = null!;

        public string Keywords { set; get; } = null!;

        public string Abstract { set; get; } = null!;
    }
}
