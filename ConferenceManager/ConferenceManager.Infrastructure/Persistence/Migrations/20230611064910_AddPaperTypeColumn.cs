using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConferenceManager.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPaperTypeColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte>(
                name: "Type",
                table: "Papers",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Papers");
        }
    }
}
