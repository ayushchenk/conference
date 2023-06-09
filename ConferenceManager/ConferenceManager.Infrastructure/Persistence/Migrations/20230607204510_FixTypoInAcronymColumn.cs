using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ConferenceManager.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FixTypoInAcronymColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Acronyn",
                table: "Conferences",
                newName: "Acronym");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Acronym",
                table: "Conferences",
                newName: "Acronyn");
        }
    }
}
