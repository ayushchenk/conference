﻿using ConferenceManager.Core.Common.Interfaces;
using ConferenceManager.Domain.Entities;
using Humanizer;

namespace ConferenceManager.Core.Submissions.Common
{
    public class SubmissionMapper : IMapper<Submission, SubmissionDto>
    {
        public SubmissionDto Map(Submission source)
        {
            return new SubmissionDto()
            {
                Id = source.Id,
                Status = source.Status,
                StatusLabel = source.Status.Humanize(),
                AuthorId = source.CreatedById,
                AuthorEmail = source.CreatedBy.Email!,
                AuthorName = source.CreatedBy.FullName,
                ConferenceId = source.ConferenceId,
                Keywords = source.Keywords,
                Title = source.Title,
                Abstract = source.Abstract,
                ResearchAreas = source.ResearchAreas.Split(Conference.ResearchAreasSeparator, StringSplitOptions.RemoveEmptyEntries),
                CreatedOn = source.CreatedOn,
                ModifiedOn = source.ModifiedOn,
                IsValidForReturn = source.IsValidForReturn,
                IsValidForUpdate = source.IsValidForUpdate,
                IsValidForReview = source.IsValidForReview,
                IsClosed = source.IsClosed,
                Reviewers = source.ActualReviewers.Select(r => r.FullName).ToArray()
            };
        }
    }
}
