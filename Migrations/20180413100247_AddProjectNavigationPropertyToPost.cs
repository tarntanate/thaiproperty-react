using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Thaiproperty.Migrations
{
    public partial class AddProjectNavigationPropertyToPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
                name: "FK_Prop_Post_NewProject_ProjectID",
                table: "Prop_Post",
                column: "ProjectID",
                principalTable: "NewProject",
                principalColumn: "ProjectID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prop_Post_NewProject_ProjectID",
                table: "Prop_Post");
        }
    }
}
