using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EternalEchoesStore.Infrastructure.Migrations.ProductDb
{
    /// <inheritdoc />
    public partial class ne1w111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "UserDb",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "UserDb");
        }
    }
}
