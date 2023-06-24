using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConferenceManager.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SubmissionResearchAreas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ResearchAreas",
                table: "Submissions",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResearchAreas",
                table: "Submissions");
        }
    }
}
