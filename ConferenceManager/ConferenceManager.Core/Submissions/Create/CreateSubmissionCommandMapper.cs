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

            using var stream = new MemoryStream();
            source.File.CopyTo(stream);

            submission.Papers.Add(new Paper() 
            {
                SubmissionId = 0,
                FileName = source.File.FileName,
                File = stream.ToArray()
            });

            return submission;
        }
    }
}
