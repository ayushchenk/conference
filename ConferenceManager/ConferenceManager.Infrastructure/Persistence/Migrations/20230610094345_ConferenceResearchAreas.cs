using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConferenceManager.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ConferenceResearchAreas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrimaryResearchArea",
                table: "Conferences");

            migrationBuilder.DropColumn(
                name: "SecondaryResearchArea",
                table: "Conferences");

            migrationBuilder.AddColumn<string>(
                name: "ResearchAreas",
                table: "Conferences",
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
                table: "Conferences");

            migrationBuilder.AddColumn<string>(
                name: "PrimaryResearchArea",
                table: "Conferences",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondaryResearchArea",
                table: "Conferences",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
