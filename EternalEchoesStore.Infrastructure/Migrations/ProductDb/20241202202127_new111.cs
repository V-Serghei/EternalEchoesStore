using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace EternalEchoesStore.Infrastructure.Migrations.ProductDb
{
    /// <inheritdoc />
    public partial class new111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProductDbUserDbs",
                table: "UsersProductDbUserDbs");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "UsersProductDbUserDbs",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProductDbUserDbs",
                table: "UsersProductDbUserDbs",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UsersProductDbUserDbs_UserId",
                table: "UsersProductDbUserDbs",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProductDbUserDbs",
                table: "UsersProductDbUserDbs");

            migrationBuilder.DropIndex(
                name: "IX_UsersProductDbUserDbs_UserId",
                table: "UsersProductDbUserDbs");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UsersProductDbUserDbs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProductDbUserDbs",
                table: "UsersProductDbUserDbs",
                columns: new[] { "UserId", "ProductId" });
        }
    }
}
