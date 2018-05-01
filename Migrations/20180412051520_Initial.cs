using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Thaiproperty.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.AlterDatabase()
            //     .Annotation("SqlServer:MemoryOptimized", true);

            // migrationBuilder.CreateTable(
            //     name: "Album",
            //     columns: table => new
            //     {
            //         AlbumID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         AlbumTitle = table.Column<string>(maxLength: 150, nullable: false),
            //         AlbumDescription = table.Column<string>(type: "ntext", nullable: false),
            //         CreateDate = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         TotalView = table.Column<int>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Album", x => x.AlbumID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Announcement",
            //     columns: table => new
            //     {
            //         AnnouncementID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         Subject = table.Column<string>(maxLength: 50, nullable: false),
            //         Body = table.Column<string>(type: "ntext", nullable: true),
            //         PostDate = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())"),
            //         StaffID = table.Column<int>(nullable: false),
            //         CategoryID = table.Column<int>(nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Announcement", x => x.AnnouncementID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Article",
            //     columns: table => new
            //     {
            //         ArticleID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         CategoryID = table.Column<byte>(nullable: true),
            //         Subject = table.Column<string>(maxLength: 100, nullable: false),
            //         Body = table.Column<string>(type: "ntext", nullable: false),
            //         PostDate = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         MemberID = table.Column<int>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Article", x => x.ArticleID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "BannerClick",
            //     columns: table => new
            //     {
            //         ClickID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         BannerCode = table.Column<string>(maxLength: 20, nullable: false),
            //         ClickTime = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         FullReferral = table.Column<string>(maxLength: 1000, nullable: true),
            //         Referral = table.Column<string>(maxLength: 200, nullable: true),
            //         IPAddress = table.Column<string>(maxLength: 15, nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_BannerClick", x => x.ClickID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Board_Topic",
            //     columns: table => new
            //     {
            //         TopicID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         TopicTitle = table.Column<string>(maxLength: 100, nullable: false),
            //         ForumID = table.Column<int>(nullable: false, defaultValueSql: "((1))"),
            //         UserID = table.Column<int>(nullable: false),
            //         UserName = table.Column<string>(maxLength: 50, nullable: true),
            //         Posted = table.Column<DateTime>(type: "datetime", nullable: false),
            //         Views = table.Column<int>(nullable: false),
            //         IsBan = table.Column<bool>(nullable: false),
            //         IPAddress = table.Column<string>(unicode: false, maxLength: 20, nullable: false),
            //         Icon = table.Column<int>(nullable: true, defaultValueSql: "((0))"),
            //         Body = table.Column<string>(type: "ntext", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Board_Topic", x => x.TopicID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Brand",
            //     columns: table => new
            //     {
            //         BrandID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         BrandNameTh = table.Column<string>(maxLength: 100, nullable: false),
            //         BrandNameEn = table.Column<string>(maxLength: 100, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Brand", x => x.BrandID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "CompanyType",
            //     columns: table => new
            //     {
            //         CompanyTypeID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         CompanyType = table.Column<string>(maxLength: 50, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_CompanyType", x => x.CompanyTypeID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "DeletedPost",
            //     columns: table => new
            //     {
            //         PostID = table.Column<int>(nullable: false),
            //         Title = table.Column<string>(maxLength: 150, nullable: false),
            //         Telephone = table.Column<string>(maxLength: 50, nullable: true),
            //         ContactName = table.Column<string>(maxLength: 50, nullable: true),
            //         PostIP = table.Column<string>(maxLength: 50, nullable: false),
            //         Price = table.Column<int>(nullable: true),
            //         ForRent = table.Column<bool>(nullable: true),
            //         ProjectID = table.Column<int>(nullable: true),
            //         Bedroom = table.Column<byte>(nullable: true),
            //         Area = table.Column<short>(nullable: true),
            //         ProvinceID = table.Column<int>(nullable: true),
            //         DistrictID = table.Column<int>(nullable: true),
            //         PostDate = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         DeleteIP = table.Column<string>(maxLength: 50, nullable: false),
            //         DeleteDate = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         DeleteReason = table.Column<int>(nullable: true),
            //         TypeID = table.Column<int>(nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_DeletedPost", x => x.PostID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "District",
            //     columns: table => new
            //     {
            //         DistrictID = table.Column<int>(nullable: false),
            //         ProvinceID = table.Column<int>(nullable: false),
            //         DistrictName = table.Column<string>(maxLength: 50, nullable: false),
            //         DistrictName_En = table.Column<string>(maxLength: 50, nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_District", x => x.DistrictID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Interview",
            //     columns: table => new
            //     {
            //         InterviewID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         Title = table.Column<string>(maxLength: 150, nullable: false),
            //         Details = table.Column<string>(type: "ntext", nullable: false),
            //         InterviewDate = table.Column<DateTime>(type: "smalldatetime", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Interview", x => x.InterviewID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Keyword",
            //     columns: table => new
            //     {
            //         Keyword = table.Column<string>(maxLength: 50, nullable: false),
            //         SqlSyntax = table.Column<string>(maxLength: 150, nullable: false),
            //         TypeID = table.Column<int>(nullable: false),
            //         ForRent = table.Column<int>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Keyword", x => x.Keyword);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Member",
            //     columns: table => new
            //     {
            //         MemberID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         FirstName = table.Column<string>(maxLength: 50, nullable: false),
            //         LastName = table.Column<string>(maxLength: 50, nullable: false),
            //         Gender = table.Column<bool>(nullable: false),
            //         EmailAddress = table.Column<string>(maxLength: 50, nullable: false),
            //         Password = table.Column<string>(maxLength: 50, nullable: false),
            //         Address = table.Column<string>(maxLength: 200, nullable: false),
            //         ProvinceID = table.Column<int>(nullable: false),
            //         Zip = table.Column<string>(maxLength: 5, nullable: false),
            //         Phone = table.Column<string>(maxLength: 50, nullable: true),
            //         Mobile = table.Column<string>(maxLength: 50, nullable: true),
            //         Birthday = table.Column<DateTime>(type: "smalldatetime", nullable: true),
            //         RegisterDate = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())"),
            //         LastLoginIP = table.Column<string>(maxLength: 20, nullable: true),
            //         LastLoginDate = table.Column<DateTime>(type: "smalldatetime", nullable: true),
            //         MemberTypeID = table.Column<int>(nullable: false, defaultValueSql: "((1))"),
            //         IsBan = table.Column<bool>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Member", x => x.MemberID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "NewProject",
            //     columns: table => new
            //     {
            //         ProjectID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         ProjectName = table.Column<string>(maxLength: 100, nullable: false),
            //         ProjectNameEn = table.Column<string>(maxLength: 50, nullable: true),
            //         ProjectImageUrl = table.Column<string>(maxLength: 500, nullable: true),
            //         ShortDesc = table.Column<string>(maxLength: 150, nullable: true),
            //         LongDesc = table.Column<string>(type: "ntext", nullable: true),
            //         BeginPrice = table.Column<string>(maxLength: 50, nullable: true),
            //         MaxPrice = table.Column<string>(maxLength: 50, nullable: true),
            //         Address = table.Column<string>(maxLength: 80, nullable: true),
            //         ProjectFinishDate = table.Column<DateTime>(type: "smalldatetime", nullable: true),
            //         ProjectPhone = table.Column<string>(maxLength: 50, nullable: true),
            //         ProjectWebSite = table.Column<string>(maxLength: 400, nullable: true),
            //         CompanyID = table.Column<int>(nullable: false),
            //         CreateDate = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())"),
            //         LocationX = table.Column<double>(nullable: true),
            //         LocationY = table.Column<double>(nullable: true),
            //         DistrictID = table.Column<int>(nullable: true),
            //         TypeID = table.Column<int>(nullable: true),
            //         IPAddress = table.Column<string>(unicode: false, maxLength: 15, nullable: false),
            //         Suspend = table.Column<bool>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_NewProject", x => x.ProjectID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "News",
            //     columns: table => new
            //     {
            //         NewsID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         Subject = table.Column<string>(maxLength: 300, nullable: false),
            //         Details = table.Column<string>(type: "ntext", nullable: false),
            //         PostDate = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())"),
            //         TotalView = table.Column<int>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_News", x => x.NewsID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "PlaceType",
            //     columns: table => new
            //     {
            //         PlaceTypeID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         PlaceTypeName_Th = table.Column<string>(maxLength: 50, nullable: false),
            //         PlaceTypeName_En = table.Column<string>(maxLength: 50, nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_PlaceType", x => x.PlaceTypeID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "PostLog",
            //     columns: table => new
            //     {
            //         PostID = table.Column<int>(nullable: false),
            //         IsMobile = table.Column<bool>(nullable: false),
            //         Browser = table.Column<string>(maxLength: 100, nullable: false),
            //         UserAgent = table.Column<string>(maxLength: 1000, nullable: false),
            //         IPAddress = table.Column<string>(maxLength: 50, nullable: false),
            //         PostDate = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         PostFromUrl = table.Column<string>(maxLength: 200, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_PostLog", x => x.PostID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "PreForums_Post",
            //     columns: table => new
            //     {
            //         PostID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         Title = table.Column<string>(maxLength: 200, nullable: false),
            //         PostName = table.Column<string>(maxLength: 30, nullable: false),
            //         PostBody = table.Column<string>(type: "ntext", nullable: false),
            //         PostDate = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         SourceUrl = table.Column<string>(maxLength: 400, nullable: false),
            //         AlreadyAdd = table.Column<bool>(nullable: false),
            //         tag = table.Column<string>(maxLength: 50, nullable: true),
            //         ForumID = table.Column<int>(nullable: false, defaultValueSql: "((2))"),
            //         Views = table.Column<int>(nullable: false),
            //         BoardCategoryTitle = table.Column<string>(maxLength: 50, nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_PreForums_Post", x => x.PostID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "PrePost",
            //     columns: table => new
            //     {
            //         PostID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         Title = table.Column<string>(maxLength: 200, nullable: false),
            //         Price = table.Column<int>(nullable: false),
            //         ForRent = table.Column<bool>(nullable: false),
            //         BathRoom = table.Column<byte>(nullable: false),
            //         BedRoom = table.Column<byte>(nullable: false),
            //         Floor = table.Column<byte>(nullable: false),
            //         Area = table.Column<short>(nullable: false),
            //         AreaUnit = table.Column<byte>(nullable: false),
            //         DetailsHtml = table.Column<string>(type: "ntext", nullable: false),
            //         Address = table.Column<string>(type: "ntext", nullable: true),
            //         Telephone = table.Column<string>(maxLength: 50, nullable: false),
            //         ProvinceID = table.Column<int>(nullable: false),
            //         DistrictID = table.Column<int>(nullable: false),
            //         TypeID = table.Column<int>(nullable: false),
            //         ImageList = table.Column<string>(type: "ntext", nullable: true),
            //         EmailAddress = table.Column<string>(maxLength: 50, nullable: true),
            //         ContactName = table.Column<string>(maxLength: 50, nullable: true),
            //         PlaceIDList = table.Column<string>(maxLength: 100, nullable: true),
            //         HaveAirCon = table.Column<bool>(nullable: false),
            //         HaveFurniture = table.Column<bool>(nullable: false),
            //         HaveCableTV = table.Column<bool>(nullable: false),
            //         HaveInternet = table.Column<bool>(nullable: false),
            //         HavePhoneLine = table.Column<bool>(nullable: false),
            //         HaveShowerHeater = table.Column<bool>(nullable: false),
            //         NearBTS = table.Column<bool>(nullable: false),
            //         NearSubway = table.Column<bool>(nullable: false),
            //         HaveParking = table.Column<bool>(nullable: false),
            //         HaveFitness = table.Column<bool>(nullable: false),
            //         AlreadyAdd = table.Column<bool>(nullable: false),
            //         SourceUrl = table.Column<string>(maxLength: 500, nullable: true),
            //         Latitude = table.Column<string>(maxLength: 50, nullable: true),
            //         Longtitude = table.Column<string>(maxLength: 50, nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_PrePost", x => x.PostID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Prop_Vote",
            //     columns: table => new
            //     {
            //         VoteID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         PostID = table.Column<int>(nullable: false),
            //         VoteScore = table.Column<int>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Prop_Vote", x => x.VoteID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "PropertyType",
            //     columns: table => new
            //     {
            //         TypeID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         TypeName_Th = table.Column<string>(maxLength: 50, nullable: false),
            //         TypeName_En = table.Column<string>(maxLength: 50, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_PropertyType", x => x.TypeID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Province",
            //     columns: table => new
            //     {
            //         ProvinceID = table.Column<int>(nullable: false),
            //         ProvinceTh = table.Column<string>(maxLength: 50, nullable: false),
            //         ProvinceEn = table.Column<string>(maxLength: 50, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Province", x => x.ProvinceID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "SearchHistory",
            //     columns: table => new
            //     {
            //         SearchID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         SearchKeyword = table.Column<string>(maxLength: 50, nullable: false),
            //         SearchDate = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())"),
            //         ResultFound = table.Column<int>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_SearchHistory", x => x.SearchID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Staff",
            //     columns: table => new
            //     {
            //         StaffID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         FirstName = table.Column<string>(maxLength: 50, nullable: false),
            //         LastName = table.Column<string>(maxLength: 50, nullable: false),
            //         Gender = table.Column<bool>(nullable: false),
            //         EmailAddress = table.Column<string>(maxLength: 50, nullable: false),
            //         Password = table.Column<string>(maxLength: 50, nullable: false),
            //         Address = table.Column<string>(maxLength: 200, nullable: true),
            //         ProvinceID = table.Column<int>(nullable: false),
            //         Zip = table.Column<string>(maxLength: 5, nullable: false),
            //         Phone = table.Column<string>(maxLength: 50, nullable: true),
            //         Mobile = table.Column<string>(maxLength: 50, nullable: true),
            //         Birthday = table.Column<DateTime>(type: "smalldatetime", nullable: true),
            //         RegisterDate = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())"),
            //         LastLoginIP = table.Column<string>(maxLength: 20, nullable: true),
            //         LastLoginDate = table.Column<DateTime>(type: "smalldatetime", nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Staff", x => x.StaffID);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "ViewHistory",
            //     columns: table => new
            //     {
            //         SessionID = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
            //         PostID = table.Column<int>(nullable: false),
            //         ViewDate = table.Column<DateTime>(type: "smalldatetime", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_ViewHistory", x => new { x.SessionID, x.PostID });
            //     });

            // migrationBuilder.CreateTable(
            //     name: "ViewLog",
            //     columns: table => new
            //     {
            //         LogID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         PostID = table.Column<int>(nullable: false),
            //         DateViewed = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())")
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_ViewLog", x => x.LogID)
            //             .Annotation("SqlServer:Clustered", false);
            //     })
            //     .Annotation("SqlServer:MemoryOptimized", true);

            // migrationBuilder.CreateTable(
            //     name: "Album_Comment",
            //     columns: table => new
            //     {
            //         CommentID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         AlbumID = table.Column<int>(nullable: false),
            //         CommentDetail = table.Column<string>(maxLength: 500, nullable: false),
            //         CommentName = table.Column<string>(maxLength: 50, nullable: false),
            //         IPAddress = table.Column<string>(maxLength: 50, nullable: false),
            //         CreateDate = table.Column<DateTime>(type: "smalldatetime", nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Album_Comment", x => x.CommentID);
            //         table.ForeignKey(
            //             name: "FK_Album_Comment_Album",
            //             column: x => x.AlbumID,
            //             principalTable: "Album",
            //             principalColumn: "AlbumID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Album_Item",
            //     columns: table => new
            //     {
            //         ItemID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         AlbumID = table.Column<int>(nullable: false),
            //         ItemFileName = table.Column<string>(maxLength: 150, nullable: false),
            //         TotalView = table.Column<int>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Album_Item", x => x.ItemID);
            //         table.ForeignKey(
            //             name: "FK_Album_Item_Album",
            //             column: x => x.AlbumID,
            //             principalTable: "Album",
            //             principalColumn: "AlbumID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Board_Reply",
            //     columns: table => new
            //     {
            //         ReplyID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         TopicID = table.Column<int>(nullable: false),
            //         ReplyBody = table.Column<string>(type: "ntext", nullable: false),
            //         ReplyDate = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         UserID = table.Column<int>(nullable: true),
            //         ReplyName = table.Column<string>(maxLength: 50, nullable: true),
            //         ReplyEmail = table.Column<string>(maxLength: 50, nullable: true),
            //         IPAddress = table.Column<string>(unicode: false, maxLength: 20, nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Board_Reply", x => x.ReplyID)
            //             .Annotation("SqlServer:Clustered", false);
            //         table.ForeignKey(
            //             name: "FK_Board_Reply_Board_Topic",
            //             column: x => x.TopicID,
            //             principalTable: "Board_Topic",
            //             principalColumn: "TopicID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Company",
            //     columns: table => new
            //     {
            //         CompanyID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         CompanyTypeID = table.Column<int>(nullable: false, defaultValueSql: "((3))"),
            //         CompanyName = table.Column<string>(maxLength: 50, nullable: false),
            //         Description = table.Column<string>(type: "ntext", nullable: true),
            //         Address = table.Column<string>(maxLength: 250, nullable: true),
            //         PhoneNumber = table.Column<string>(maxLength: 50, nullable: true),
            //         FaxNumber = table.Column<string>(maxLength: 50, nullable: true),
            //         WebSite = table.Column<string>(maxLength: 50, nullable: true),
            //         EmailAddress = table.Column<string>(maxLength: 50, nullable: true),
            //         Username = table.Column<string>(maxLength: 50, nullable: true),
            //         Password = table.Column<string>(maxLength: 50, nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Company", x => x.CompanyID);
            //         table.ForeignKey(
            //             name: "FK_Company_CompanyType",
            //             column: x => x.CompanyTypeID,
            //             principalTable: "CompanyType",
            //             principalColumn: "CompanyTypeID",
            //             onDelete: ReferentialAction.Restrict);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "NewProject_Comment",
            //     columns: table => new
            //     {
            //         CommentID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         ProjectID = table.Column<int>(nullable: false),
            //         CommentDetails = table.Column<string>(type: "ntext", nullable: false),
            //         AttachImage = table.Column<string>(maxLength: 250, nullable: true),
            //         CommentName = table.Column<string>(maxLength: 50, nullable: false),
            //         CommentDate = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         IPAddress = table.Column<string>(maxLength: 50, nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_NewProject_Comment", x => x.CommentID);
            //         table.ForeignKey(
            //             name: "FK_NewProject_Comment_NewProject",
            //             column: x => x.ProjectID,
            //             principalTable: "NewProject",
            //             principalColumn: "ProjectID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Place",
            //     columns: table => new
            //     {
            //         PlaceID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         PlaceName_Th = table.Column<string>(maxLength: 50, nullable: false),
            //         PlaceName_En = table.Column<string>(maxLength: 50, nullable: true),
            //         PlaceTypeID = table.Column<int>(nullable: false, defaultValueSql: "((1))"),
            //         PlaceMapX = table.Column<double>(nullable: true),
            //         PlaceMapY = table.Column<double>(nullable: true),
            //         PlaceGoogleXML = table.Column<string>(maxLength: 50, nullable: true),
            //         DistrictID = table.Column<int>(nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Place", x => x.PlaceID)
            //             .Annotation("SqlServer:Clustered", false);
            //         table.ForeignKey(
            //             name: "FK_Place_PlaceType",
            //             column: x => x.PlaceTypeID,
            //             principalTable: "PlaceType",
            //             principalColumn: "PlaceTypeID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "PreForums_Reply",
            //     columns: table => new
            //     {
            //         ReplyID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         PostName = table.Column<string>(maxLength: 30, nullable: false),
            //         PostBody = table.Column<string>(type: "ntext", nullable: false),
            //         PostDate = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())"),
            //         PostID = table.Column<int>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_PreForums_Reply", x => x.ReplyID)
            //             .Annotation("SqlServer:Clustered", false);
            //         table.ForeignKey(
            //             name: "FK_PreForums_Reply_PreForums_Post",
            //             column: x => x.PostID,
            //             principalTable: "PreForums_Post",
            //             principalColumn: "PostID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Prop_Post",
            //     columns: table => new
            //     {
            //         PostID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         Title = table.Column<string>(maxLength: 150, nullable: false),
            //         Price = table.Column<int>(nullable: false),
            //         ForRent = table.Column<bool>(nullable: false),
            //         BathRoom = table.Column<byte>(nullable: false, defaultValueSql: "((1))"),
            //         BedRoom = table.Column<byte>(nullable: false, defaultValueSql: "((1))"),
            //         Floor = table.Column<byte>(nullable: false, defaultValueSql: "((1))"),
            //         Area = table.Column<short>(nullable: true),
            //         AreaUnit = table.Column<byte>(nullable: true),
            //         Details = table.Column<string>(type: "ntext", nullable: false),
            //         Address = table.Column<string>(maxLength: 100, nullable: false),
            //         Telephone = table.Column<string>(maxLength: 50, nullable: true),
            //         ProvinceID = table.Column<int>(nullable: false),
            //         DistrictID = table.Column<int>(nullable: false),
            //         TypeID = table.Column<int>(nullable: false),
            //         MemberID = table.Column<int>(nullable: false),
            //         LogoImageFile = table.Column<string>(maxLength: 100, nullable: true),
            //         LocationX = table.Column<double>(nullable: true),
            //         LocationY = table.Column<double>(nullable: true),
            //         LocationGoogleMap = table.Column<string>(maxLength: 50, nullable: true),
            //         TotalView = table.Column<int>(nullable: false),
            //         IPAddress = table.Column<string>(maxLength: 16, nullable: false),
            //         PostDate = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())"),
            //         ExpireDate = table.Column<DateTime>(type: "smalldatetime", nullable: false),
            //         EmailAddress = table.Column<string>(maxLength: 50, nullable: true),
            //         ContactName = table.Column<string>(maxLength: 50, nullable: true),
            //         Title_En = table.Column<string>(maxLength: 100, nullable: true),
            //         Deposit = table.Column<int>(nullable: true),
            //         PasswordForEdit = table.Column<string>(maxLength: 10, nullable: true),
            //         SponsorExpireDate = table.Column<DateTime>(type: "smalldatetime", nullable: true),
            //         SourceImage = table.Column<string>(type: "ntext", nullable: true),
            //         ProjectID = table.Column<int>(nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Prop_Post", x => x.PostID);
            //         table.ForeignKey(
            //             name: "FK_Prop_Post_District",
            //             column: x => x.DistrictID,
            //             principalTable: "District",
            //             principalColumn: "DistrictID",
            //             onDelete: ReferentialAction.Cascade);
            //         table.ForeignKey(
            //             name: "FK_Prop_Post_Member",
            //             column: x => x.MemberID,
            //             principalTable: "Member",
            //             principalColumn: "MemberID",
            //             onDelete: ReferentialAction.Cascade);
            //         table.ForeignKey(
            //             name: "FK_Prop_Post_Province",
            //             column: x => x.ProvinceID,
            //             principalTable: "Province",
            //             principalColumn: "ProvinceID",
            //             onDelete: ReferentialAction.Restrict);
            //         table.ForeignKey(
            //             name: "FK_Prop_Post_PropertyType",
            //             column: x => x.TypeID,
            //             principalTable: "PropertyType",
            //             principalColumn: "TypeID",
            //             onDelete: ReferentialAction.Restrict);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Comment",
            //     columns: table => new
            //     {
            //         CommentID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         PostID = table.Column<int>(nullable: false),
            //         MemberID = table.Column<int>(nullable: true),
            //         CommentName = table.Column<string>(maxLength: 50, nullable: false),
            //         CommentEmail = table.Column<string>(maxLength: 50, nullable: false),
            //         CommentDetails = table.Column<string>(maxLength: 500, nullable: false),
            //         IPAddress = table.Column<string>(maxLength: 16, nullable: true),
            //         IsApprove = table.Column<bool>(nullable: false),
            //         CommentDate = table.Column<DateTime>(type: "smalldatetime", nullable: false, defaultValueSql: "(getdate())"),
            //         CommentKey = table.Column<string>(maxLength: 50, nullable: true)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Comment", x => x.CommentID)
            //             .Annotation("SqlServer:Clustered", false);
            //         table.ForeignKey(
            //             name: "FK_Comment_Prop_Post",
            //             column: x => x.PostID,
            //             principalTable: "Prop_Post",
            //             principalColumn: "PostID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Prop_Image",
            //     columns: table => new
            //     {
            //         ImageID = table.Column<int>(nullable: false)
            //             .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //         PostID = table.Column<int>(nullable: false),
            //         ImageFileName = table.Column<string>(maxLength: 200, nullable: false, defaultValueSql: "((1))")
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Prop_Image", x => x.ImageID);
            //         table.ForeignKey(
            //             name: "FK_Prop_Image_Prop_Post",
            //             column: x => x.PostID,
            //             principalTable: "Prop_Post",
            //             principalColumn: "PostID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Prop_Option",
            //     columns: table => new
            //     {
            //         PostID = table.Column<int>(nullable: false),
            //         AirCon = table.Column<bool>(nullable: false),
            //         Furniture = table.Column<bool>(nullable: false),
            //         CableTV = table.Column<bool>(nullable: false),
            //         Internet = table.Column<bool>(nullable: false),
            //         DirectLine = table.Column<bool>(nullable: false),
            //         ShowerHeater = table.Column<bool>(nullable: false),
            //         NearBTS = table.Column<bool>(nullable: false),
            //         NearSubway = table.Column<bool>(nullable: false),
            //         Parking = table.Column<bool>(nullable: false),
            //         Fitness = table.Column<bool>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Prop_Option", x => x.PostID);
            //         table.ForeignKey(
            //             name: "FK_Prop_Option_Prop_Post",
            //             column: x => x.PostID,
            //             principalTable: "Prop_Post",
            //             principalColumn: "PostID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateTable(
            //     name: "Prop_Place",
            //     columns: table => new
            //     {
            //         PropID = table.Column<int>(nullable: false),
            //         PlaceID = table.Column<int>(nullable: false)
            //     },
            //     constraints: table =>
            //     {
            //         table.PrimaryKey("PK_Prop_Place", x => new { x.PropID, x.PlaceID })
            //             .Annotation("SqlServer:Clustered", false);
            //         table.ForeignKey(
            //             name: "FK_Prop_Place_Place",
            //             column: x => x.PlaceID,
            //             principalTable: "Place",
            //             principalColumn: "PlaceID",
            //             onDelete: ReferentialAction.Cascade);
            //         table.ForeignKey(
            //             name: "FK_Prop_Place_Prop_Post",
            //             column: x => x.PropID,
            //             principalTable: "Prop_Post",
            //             principalColumn: "PostID",
            //             onDelete: ReferentialAction.Cascade);
            //     });

            // migrationBuilder.CreateIndex(
            //     name: "IX_Album_Comment_AlbumID",
            //     table: "Album_Comment",
            //     column: "AlbumID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Album_Item_AlbumID",
            //     table: "Album_Item",
            //     column: "AlbumID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Board_Reply_TopicID",
            //     table: "Board_Reply",
            //     column: "TopicID")
            //     .Annotation("SqlServer:Clustered", true);

            // migrationBuilder.CreateIndex(
            //     name: "IX_Comment_PostID",
            //     table: "Comment",
            //     columns: new[] { "PostID", "CommentID" })
            //     .Annotation("SqlServer:Clustered", true);

            // migrationBuilder.CreateIndex(
            //     name: "IX_Company_CompanyTypeID",
            //     table: "Company",
            //     column: "CompanyTypeID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_NewProject_ProjectName",
            //     table: "NewProject",
            //     column: "ProjectName");

            // migrationBuilder.CreateIndex(
            //     name: "IX_NewProject_ProjectNameEN",
            //     table: "NewProject",
            //     column: "ProjectNameEn");

            // migrationBuilder.CreateIndex(
            //     name: "IX_NewProject_Comment_ProjectID",
            //     table: "NewProject_Comment",
            //     column: "ProjectID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_PlaceTypeID",
            //     table: "Place",
            //     columns: new[] { "PlaceTypeID", "PlaceName_Th", "PlaceName_En", "PlaceID" })
            //     .Annotation("SqlServer:Clustered", true);

            // migrationBuilder.CreateIndex(
            //     name: "IX_PreForums_Post",
            //     table: "PreForums_Post",
            //     column: "PostDate");

            // migrationBuilder.CreateIndex(
            //     name: "IX_PreForums_Reply",
            //     table: "PreForums_Reply",
            //     column: "PostID")
            //     .Annotation("SqlServer:Clustered", true);

            // migrationBuilder.CreateIndex(
            //     name: "IX_Prop_Image",
            //     table: "Prop_Image",
            //     columns: new[] { "PostID", "ImageFileName" });

            // migrationBuilder.CreateIndex(
            //     name: "_dta_index_Prop_Option_5_2117582582__col__",
            //     table: "Prop_Option",
            //     columns: new[] { "PostID", "AirCon", "Furniture", "CableTV", "Internet", "DirectLine", "ShowerHeater", "NearBTS", "NearSubway", "Parking", "Fitness" });

            // migrationBuilder.CreateIndex(
            //     name: "_dta_index_Prop_Place_c_34_1013578649__K1",
            //     table: "Prop_Place",
            //     column: "PropID")
            //     .Annotation("SqlServer:Clustered", true);

            // migrationBuilder.CreateIndex(
            //     name: "_dta_index_Prop_Place_34_1013578649__K2_K1",
            //     table: "Prop_Place",
            //     columns: new[] { "PlaceID", "PropID" });

            // migrationBuilder.CreateIndex(
            //     name: "_dta_index_Prop_Place_5_1013578649__col__",
            //     table: "Prop_Place",
            //     columns: new[] { "PropID", "PlaceID" });

            // migrationBuilder.CreateIndex(
            //     name: "IX_Prop_Post_DistrictID",
            //     table: "Prop_Post",
            //     column: "DistrictID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Prop_Post_MemberID",
            //     table: "Prop_Post",
            //     column: "MemberID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Prop_Post_ProjectID",
            //     table: "Prop_Post",
            //     column: "ProjectID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Prop_Post_ProvinceID",
            //     table: "Prop_Post",
            //     column: "ProvinceID");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Prop_Post_Title",
            //     table: "Prop_Post",
            //     column: "Title");

            // migrationBuilder.CreateIndex(
            //     name: "IX_Prop_Post_TypeID",
            //     table: "Prop_Post",
            //     column: "TypeID");

            // migrationBuilder.CreateIndex(
            //     name: "_dta_index_Prop_Post_34_1662628966__K1_K15",
            //     table: "Prop_Post",
            //     columns: new[] { "PostID", "TypeID" });

            // migrationBuilder.CreateIndex(
            //     name: "_dta_index_Prop_Post_34_1662628966__K1_2",
            //     table: "Prop_Post",
            //     columns: new[] { "Title", "PostID" });

            // migrationBuilder.CreateIndex(
            //     name: "IX_Prop_Post_SponsorExpireDate",
            //     table: "Prop_Post",
            //     columns: new[] { "TypeID", "SponsorExpireDate" });

            // migrationBuilder.CreateIndex(
            //     name: "_dta_index_Prop_Post_5_1662628966__K15_K4_K30",
            //     table: "Prop_Post",
            //     columns: new[] { "TypeID", "ForRent", "SponsorExpireDate" });

            // migrationBuilder.CreateIndex(
            //     name: "_dta_index_Prop_Post_5_1662628966__col__",
            //     table: "Prop_Post",
            //     columns: new[] { "PostID", "Title", "Price", "ForRent", "BathRoom", "BedRoom", "Floor", "Area", "AreaUnit", "Address", "Telephone", "ProvinceID", "DistrictID", "TypeID", "MemberID", "LogoImageFile", "LocationX", "LocationY", "LocationGoogleMap", "TotalView", "IPAddress", "PostDate", "ExpireDate", "EmailAddress", "ContactName", "Title_En", "Deposit", "PasswordForEdit", "SponsorExpireDate", "ProjectID" });

            // migrationBuilder.CreateIndex(
            //     name: "IX_CX_ViewLog",
            //     table: "ViewLog",
            //     columns: new[] { "PostID", "DateViewed" })
            //     .Annotation("SqlServer:Clustered", false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropTable(
            //     name: "Album_Comment");

            // migrationBuilder.DropTable(
            //     name: "Album_Item");

            // migrationBuilder.DropTable(
            //     name: "Announcement");

            // migrationBuilder.DropTable(
            //     name: "Article");

            // migrationBuilder.DropTable(
            //     name: "BannerClick");

            // migrationBuilder.DropTable(
            //     name: "Board_Reply");

            // migrationBuilder.DropTable(
            //     name: "Brand");

            // migrationBuilder.DropTable(
            //     name: "Comment");

            // migrationBuilder.DropTable(
            //     name: "Company");

            // migrationBuilder.DropTable(
            //     name: "DeletedPost");

            // migrationBuilder.DropTable(
            //     name: "Interview");

            // migrationBuilder.DropTable(
            //     name: "Keyword");

            // migrationBuilder.DropTable(
            //     name: "NewProject_Comment");

            // migrationBuilder.DropTable(
            //     name: "News");

            // migrationBuilder.DropTable(
            //     name: "PostLog");

            // migrationBuilder.DropTable(
            //     name: "PreForums_Reply");

            // migrationBuilder.DropTable(
            //     name: "PrePost");

            // migrationBuilder.DropTable(
            //     name: "Prop_Image");

            // migrationBuilder.DropTable(
            //     name: "Prop_Option");

            // migrationBuilder.DropTable(
            //     name: "Prop_Place");

            // migrationBuilder.DropTable(
            //     name: "Prop_Vote");

            // migrationBuilder.DropTable(
            //     name: "SearchHistory");

            // migrationBuilder.DropTable(
            //     name: "Staff");

            // migrationBuilder.DropTable(
            //     name: "ViewHistory");

            // migrationBuilder.DropTable(
            //     name: "ViewLog")
            //     .Annotation("SqlServer:MemoryOptimized", true);

            // migrationBuilder.DropTable(
            //     name: "Album");

            // migrationBuilder.DropTable(
            //     name: "Board_Topic");

            // migrationBuilder.DropTable(
            //     name: "CompanyType");

            // migrationBuilder.DropTable(
            //     name: "NewProject");

            // migrationBuilder.DropTable(
            //     name: "PreForums_Post");

            // migrationBuilder.DropTable(
            //     name: "Place");

            // migrationBuilder.DropTable(
            //     name: "Prop_Post");

            // migrationBuilder.DropTable(
            //     name: "PlaceType");

            // migrationBuilder.DropTable(
            //     name: "District");

            // migrationBuilder.DropTable(
            //     name: "Member");

            // migrationBuilder.DropTable(
            //     name: "Province");

            // migrationBuilder.DropTable(
            //     name: "PropertyType");

            // migrationBuilder.AlterDatabase()
            //     .OldAnnotation("SqlServer:MemoryOptimized", true);
        }
    }
}
