using ConferenceManager.Core.Common.Extensions;
using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;

namespace ConferenceManager.Core.Submissions.Create
{
    public class CreateSubmissionCommandMapper : IMapper<CreateSubmissionCommand, Submission>
    {
        public Submission Map(CreateSubmissionCommand source)
        {
            var submission = new Submission()
            {
                Abstract = source.Abstract,
                ConferenceId = source.ConferenceId,
                Keywords = source.Keywords,
                Title = source.Title,
                Status = Domain.Enums.SubmissionStatus.Created,
                Papers = new List<Paper>()
            };

            submission.Papers.Add(new Paper() 
            {
                SubmissionId = 0,
                FileName = source.File.FileName,
                File = source.File.ToBytes()
            });

            return submission;
        }
    }
}
