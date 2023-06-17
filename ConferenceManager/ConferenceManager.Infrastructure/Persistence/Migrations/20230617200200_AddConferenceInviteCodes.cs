using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConferenceManager.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddConferenceInviteCodes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AuthorInviteCode",
                table: "Conferences",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ChairInviteCode",
                table: "Conferences",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ReviewerInviteCode",
                table: "Conferences",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthorInviteCode",
                table: "Conferences");

            migrationBuilder.DropColumn(
                name: "ChairInviteCode",
                table: "Conferences");

            migrationBuilder.DropColumn(
                name: "ReviewerInviteCode",
                table: "Conferences");
        }
    }
}
