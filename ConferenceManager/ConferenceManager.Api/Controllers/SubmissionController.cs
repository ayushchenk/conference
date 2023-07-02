using ConferenceManager.Api.Abstract;
using ConferenceManager.Api.Filters;
using ConferenceManager.Core.Account.Common;
using ConferenceManager.Core.Common.Model.Responses;
using ConferenceManager.Core.Submissions.AddPreference;
using ConferenceManager.Core.Submissions.AddReviewer;
using ConferenceManager.Core.Submissions.Common;
using ConferenceManager.Core.Submissions.Create;
using ConferenceManager.Core.Submissions.CreateComment;
using ConferenceManager.Core.Submissions.CreateReview;
using ConferenceManager.Core.Submissions.DeleteComment;
using ConferenceManager.Core.Submissions.Get;
using ConferenceManager.Core.Submissions.GetComments;
using ConferenceManager.Core.Submissions.GetPreferences;
using ConferenceManager.Core.Submissions.GetReviewers;
using ConferenceManager.Core.Submissions.GetReviews;
using ConferenceManager.Core.Submissions.HasPreference;
using ConferenceManager.Core.Submissions.Papers;
using ConferenceManager.Core.Submissions.RemovePreference;
using ConferenceManager.Core.Submissions.RemoveReviewer;
using ConferenceManager.Core.Submissions.Return;
using ConferenceManager.Core.Submissions.Update;
using ConferenceManager.Core.Submissions.UpdateComment;
using ConferenceManager.Core.Submissions.UpdateReview;
using ConferenceManager.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ConferenceManager.Api.Controllers
{
    public class SubmissionController : ApiControllerBase
    {
        /// <summary>
        /// Creates new submission
        /// </summary>
        [HttpPost]
        [Authorize(Roles = ApplicationRole.Author)]
        [ConferenceAuthorization(ApplicationRole.Author)]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CreateEntityResponse))]
        public async Task<IActionResult> Post([FromForm] CreateSubmissionCommand command, CancellationToken cancellation)
        {
            var result = await Mediator.Send(command, cancellation);

            return Created(nameof(SubmissionController), result);
        }

        /// <summary>
        /// Updates submission information
        /// </summary>
        /// <remarks>
        /// Author can only update submission, after it was created, or if it was returned by reviewer. <br/>
        /// All payload except File is required, when File is present, new record in Papers table is created.
        /// </remarks>
        [HttpPut]
        [Authorize(Roles = ApplicationRole.Author)]
        [ConferenceAuthorization(ApplicationRole.Author)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Put([FromForm] UpdateSubmissionCommand command, CancellationToken cancellation)
        {
            await Mediator.Send(command, cancellation);

            return NoContent();
        }

        /// <summary>
        /// Returns submission by id
        /// </summary>
        /// <remarks>
        /// User can only access submissions from conferences, that he is part of (not requried for Admin).<br/>
        /// Author can only get his own submissions.
        /// </remarks>
        [HttpGet]
        [Route("{id}")]
        [Authorize]
        [ConferenceAuthorization]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(SubmissionDto))]
        public async Task<IActionResult> Get(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Returns submission papers
        /// </summary>
        /// <remarks>
        /// Papers are ordered by created on descending. <br/>
        /// Author can only get papers of his own submission. <br/>
        /// Reviewer can only get papers of submission, that he is assigned to. <br/>
        /// Admin and chair can access everything.
        /// </remarks>
        [HttpGet]
        [Route("{id}/papers")]
        [Authorize]
        [ConferenceAuthorization]
        [SwaggerResponse(StatusCodes.Status200OK, Type = (typeof(IEnumerable<PaperDto>)))]
        public async Task<IActionResult> GetPapers(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionPapersQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Marks submission to be updated by author
        /// </summary>
        /// <remarks>
        /// Reviwer can only return submission after it was created or updated by author. <br/>
        /// Reviwer can only return submission that he is assigned to. <br/>
        /// </remarks>
        [HttpPost]
        [Route("{id}/return")]
        [Authorize(Roles = ApplicationRole.Reviewer)]
        [ConferenceAuthorization(ApplicationRole.Reviewer)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> Return(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new ReturnSubmissionCommand(id), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Updates review for submission
        /// </summary>
        /// <remarks>
        /// Reviewer can only update his own review. <br/>
        /// Reviewer cannot update review if submission is closed or rejected.
        /// </remarks>
        [HttpPut]
        [Route("reviews")]
        [Authorize(Roles = ApplicationRole.Reviewer)]
        [ConferenceAuthorization(ApplicationRole.Reviewer)]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ReviewDto))]
        public async Task<IActionResult> PutReview(UpdateReviewCommand command, CancellationToken cancellation)
        {
            var result = await Mediator.Send(command, cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Creates new review for submission
        /// </summary>
        /// <remarks>
        /// Reviewer can only create one review for a submission. <br/>
        /// Reviewer can only send reviews to submissions, that he is assigned to.
        /// </remarks>
        [HttpPost]
        [Route("{id}/reviews")]
        [Authorize(Roles = ApplicationRole.Reviewer)]
        [ConferenceAuthorization(ApplicationRole.Reviewer)]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CreateEntityResponse))]
        public async Task<IActionResult> PostReview(int id, CreateReviewCommand command, CancellationToken cancellation)
        {
            command.SubmissionId = id;
            var result = await Mediator.Send(command, cancellation);

            return Created(nameof(SubmissionController), result);
        }

        /// <summary>
        /// Returns reviews for the submission
        /// </summary>
        /// <remarks>
        /// Reviewer can only see reviews of submission, he is assigned to
        /// </remarks>
        [HttpGet]
        [Route("{id}/reviews")]
        [Authorize(Roles = $"{ApplicationRole.Chair},{ApplicationRole.Reviewer}")]
        [ConferenceAuthorization(ApplicationRole.Chair, ApplicationRole.Reviewer)]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<ReviewDto>))]
        public async Task<IActionResult> GetReviews(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionReviewsQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Update comment for submission
        /// </summary>
        /// <remarks>
        /// User can only update his own comments (Admin can update everything)
        /// </remarks>
        [HttpPut]
        [Route("comments")]
        [Authorize]
        [ConferenceAuthorization]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CommentDto))]
        public async Task<IActionResult> PutComment(UpdateCommentCommand command, CancellationToken cancellation)
        {
            var result = await Mediator.Send(command, cancellation);

            return Ok(result);
        }


        /// <summary>
        /// Delete comment for submission
        /// </summary>
        /// <remarks>
        /// User can only delete his own comments (Admin can delete everything)
        /// </remarks>
        [HttpDelete]
        [Route("comments/{id}")]
        [Authorize]
        [ConferenceAuthorization]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteComment(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new DeleteCommentCommand(id), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Create comment for a submission
        /// </summary>
        /// <remarks>
        /// Reviewer can only leave comments for submission he is assigned to.
        /// Author can only leave comments for his ows submissions.
        /// </remarks>
        [HttpPost]
        [Route("{id}/comments")]
        [Authorize]
        [ConferenceAuthorization]
        [SwaggerResponse(StatusCodes.Status200OK, Type = (typeof(CommentDto)))]
        public async Task<IActionResult> PostComment(int id, CreateCommentCommand command, CancellationToken cancellation)
        {
            command.SubmissionId = id;
            var result = await Mediator.Send(command, cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Returns comments of a submission
        /// </summary>
        /// <remarks>
        /// Reviewer can view comments of submission he is assigned to.
        /// Comments are orderded by createdon descending.
        /// </remarks>
        [HttpGet]
        [Route("{id}/comments")]
        [Authorize]
        [ConferenceAuthorization]
        [SwaggerResponse(StatusCodes.Status200OK, Type = (typeof(IEnumerable<CommentDto>)))]
        public async Task<IActionResult> GetComments(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetCommentsQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Returns reviewers of submission
        /// </summary>
        /// <remarks>
        /// Ordered by user id. <br/>
        /// Reviewer should be in the same conference as submission
        /// </remarks>
        [HttpGet]
        [Route("{id}/reviewers")]
        [Authorize(Roles = ApplicationRole.Chair)]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [SwaggerResponse(StatusCodes.Status200OK, Type = (typeof(IEnumerable<UserDto>)))]
        public async Task<IActionResult> GetReviewers(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetSubmissionReviewersQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Assign reviewer to submission
        /// </summary>
        /// <remarks>
        /// Reviewer should be in the same conference with sumbission
        /// </remarks>
        [HttpPost]
        [Route("{id}/reviewers/{userId}")]
        [Authorize(Roles = ApplicationRole.Chair)]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> AddReviewer(int id, int userId, CancellationToken cancellation)
        {
            await Mediator.Send(new AddReviewerCommand(id, userId), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Unassign reviewer from submission
        /// </summary>
        [HttpDelete]
        [Route("{id}/reviewers/{userId}")]
        [Authorize(Roles = ApplicationRole.Chair)]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> RemoveReviewer(int id, int userId, CancellationToken cancellation)
        {
            await Mediator.Send(new RemoveReviewerCommand(id, userId), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Gets all preferences for a submission review
        /// </summary>
        [HttpGet]
        [Route("{id}/preferences")]
        [Authorize(Roles = ApplicationRole.Chair)]
        [ConferenceAuthorization(ApplicationRole.Chair)]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserDto>))]
        public async Task<IActionResult> GetPreferences(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new GetReviewPreferencesQuery(id), cancellation);

            return Ok(result);
        }

        /// <summary>
        /// Submits preference for a submission review
        /// </summary>
        /// <remarks>
        /// Caller (reviwer) should be in the same conference with sumbission
        /// </remarks>
        [HttpPost]
        [Route("{id}/preferences")]
        [Authorize(Roles = ApplicationRole.Reviewer)]
        [ConferenceAuthorization(ApplicationRole.Reviewer)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> AddPreference(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new AddReviewPreferenceCommand(id), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Removes preference for a submission review
        /// </summary>
        [HttpDelete]
        [Route("{id}/preferences")]
        [Authorize(Roles = ApplicationRole.Reviewer)]
        [ConferenceAuthorization(ApplicationRole.Reviewer)]
        [SwaggerResponse(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> RemovePreference(int id, CancellationToken cancellation)
        {
            await Mediator.Send(new RemoveReviewPreferenceCommand(id), cancellation);

            return NoContent();
        }

        /// <summary>
        /// Checks if current user has preference
        /// </summary>
        [HttpGet]
        [Route("{id}/has-preference")]
        [Authorize]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(BoolResponse))]
        public async Task<IActionResult> HasPreference(int id, CancellationToken cancellation)
        {
            var result = await Mediator.Send(new HasSubmissionPreferenceFromUserQuery(id), cancellation);

            return Ok(result);
        }
    }
}
