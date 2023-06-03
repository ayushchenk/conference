using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConferenceManager.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddReviewScoreColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<short>(
                name: "Score",
                table: "Reviews",
                type: "smallint",
                nullable: false,
                defaultValue: (short)0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Score",
                table: "Reviews");
        }
    }
}
