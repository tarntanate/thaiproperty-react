using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Thaiproperty.Models;
using Thaiproperty.ViewModels;

namespace Thaiproperty.Controllers
{
  [Route("api/[controller]/[action]")]
  public class PostController : Controller
  {
    private readonly ThaipropertyDbContext dbContext;
    private const string SERVER_URL = "http://www.thaiproperty.in.th";
    private const string IMAGE_FOLDER = "images";
    private const string IMAGE_THUMBNAIL_SIZE = "400x300";
    private const string IMAGE_THUMBNAIL_QUALITY = "85";

    public PostController(ThaipropertyDbContext dbContext)
    {
      this.dbContext = dbContext;
    }

    [HttpGet("{PostID}")]
    public IActionResult GetPost(int PostID)
    {
      var result = dbContext.PropPost
        .AsNoTracking()
        .Include(p => p.PropOption)
        .Include(p => p.PropImages)
        .Include(p => p.PropPlaces)
        .Include(p => p.Project)
        .Select(p => new PostDetail{
          PostId = p.PostId,
          Title = p.Title,
          IsForRent = p.ForRent,
          TotalView = p.TotalView,
          Type = p.Type,
          Area = p.Area,
          AreaUnit = p.AreaUnit,
          Floor = p.Floor,
          BathRoom = p.BathRoom,
          BedRoom = p.BedRoom,
          Province = p.Province,
          District = p.District,
          Price = p.Price,
          Deposit = p.Deposit,
          PostDate = p.PostDate,
          ExpireDate = p.ExpireDate,
          SponsorExpireDate = p.SponsorExpireDate,
          ContactName = p.ContactName,
          EmailAddress = p.EmailAddress,
          Telephone = p.Telephone,
          MemberId = p.MemberId,
          LogoImageFile = p.LogoImageFile,
          Details = p.Details,
          IPCreator = p.Ipaddress,
          PropOption = p.PropOption,
          ForRentText = p.ForRent ? "ให้เช่า" : "ขาย",
          PropImages = p.PropImages.Select(image => new PropertyImage() { 
            ImageId = image.ImageId,
            ImageFileName = image.ImageFileName,
          }).ToList(),
          PropPlaces = p.PropPlaces.Select(place => new PropertyPlace() { 
            PlaceId = place.PlaceId,
            PlaceName = dbContext.Place.FirstOrDefault(_p => _p.PlaceId == place.PlaceId).PlaceNameTh
          }).ToList(),
          Comments = p.Comments,
          Location = new Location { 
            Lat = p.LocationX, 
            Lng = p.LocationY },
          Project = new NewProjectView {
            ProjectId = p.Project.ProjectId,
            ProjectName = p.Project.ProjectName,
            ProjectNameEn = p.Project.ProjectNameEn,
            // ProjectImageUrl = p.Project.ProjectImageUrl,
            CompanyId = p.Project.CompanyId
          },
        })
        .FirstOrDefault(post => post.PostId == PostID);
      if (result == null) {
        // HttpContext.Response.StatusCode = StatusCodes.Status204NoContent;
        return NotFound();
      }
      // var PlaceNameList = dbContext.Place.Where(p => p.PlaceId == result.PropPlaces.)
      return Json(result);
    }

    [HttpGet("{limitResult?}")]
    public IActionResult GetAllPosts(int limitResult = 50)
    {
        var result = GetPostList()
        .OrderByDescending(post => post.PostId)
        .Take(limitResult);
      if (result == null) {
        // HttpContext.Response.StatusCode = StatusCodes.Status204NoContent;
        return NotFound();
      }
      return Json(result.ToList());
    }

    [HttpGet]
    public IActionResult GetPosts([FromQuery] int typeId, [FromQuery] int districId, [FromQuery] int bedRoom, [FromQuery] int limitResult = 500)
    {
      var result = GetPostList();
      if (typeId > 0) 
      {
        result = result.Where(p => p.TypeId == typeId);
      }
      if (districId > 0)
      {
        result = result.Where(p => p.District.DistrictId == districId);
      }
      if (bedRoom > 0)
      {
        result = result.Where(p => p.BedRoom == bedRoom);
      }
      if (result == null) {
        // HttpContext.Response.StatusCode = StatusCodes.Status204NoContent;
        // return Json(new Object());
        return Json(new {});
      }
      return Json(result
        .OrderByDescending(post => post.PostId)
        .Take(limitResult)
        .ToList());
    }

    public IQueryable<PostList> GetPostList()
    {
      return dbContext.PropPost
        .AsNoTracking()
        // .Include(p => p.Type)
        // .Include(p => p.Province)
        .Select(p => new PostList{
          PostId = p.PostId,
          TypeId = p.TypeId,
          Title = p.Title,
          IsForRent = p.ForRent,
          TotalView = p.TotalView,
          Type = p.Type,
          Area = p.Area,
          AreaUnit = p.AreaUnit,
          Floor = p.Floor,
          BathRoom = p.BathRoom,
          BedRoom = p.BedRoom,
          Province = p.Province,
          District = p.District,
          Price = p.Price,
          Deposit = p.Deposit,
          PostDate = p.PostDate,
          ContactName = p.ContactName,
          LogoImageFile = p.LogoImageFile,
          ProjectId = p.ProjectId,
          Location = new Location { 
            Lat = p.LocationX, 
            Lng = p.LocationY },
          ForRentText = p.ForRent ? "ให้เช่า" : "ขาย",
          ThumbnailUrl = $"{SERVER_URL}/image.aspx?f={p.LogoImageFile}&size={IMAGE_THUMBNAIL_SIZE}&Quality={IMAGE_THUMBNAIL_QUALITY}",
        });
    }
  }
}