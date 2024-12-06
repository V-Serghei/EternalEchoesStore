using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EternalEchoesStore.Infrastructure.Migrations.ProductDb
{
    /// <inheritdoc />
    public partial class new1111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProductDbUserDbs",
                table: "UsersProductDbUserDbs");

            migrationBuilder.DropIndex(
                name: "IX_UsersProductDbUserDbs_UserId",
                table: "UsersProductDbUserDbs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProductDbUserDbs",
                table: "UsersProductDbUserDbs",
                columns: new[] { "UserId", "ProductId" });

            migrationBuilder.CreateIndex(
                name: "IX_UsersProductDbUserDbs_ProductId",
                table: "UsersProductDbUserDbs",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_UsersProductDbUserDbs",
                table: "UsersProductDbUserDbs");

            migrationBuilder.DropIndex(
                name: "IX_UsersProductDbUserDbs_ProductId",
                table: "UsersProductDbUserDbs");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UsersProductDbUserDbs",
                table: "UsersProductDbUserDbs",
                columns: new[] { "ProductId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_UsersProductDbUserDbs_UserId",
                table: "UsersProductDbUserDbs",
                column: "UserId");
        }
    }
}
