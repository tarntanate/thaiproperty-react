using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Thaiproperty.Common;
using Thaiproperty.Models;
using Thaiproperty.Repositories;
using Thaiproperty.ViewModels.Post;
using Thaiproperty.ViewModels.Project;

namespace Thaiproperty.Controllers
{
    [Route("api/[controller]")]
    public class PostsController : Controller
    {
        private readonly ThaipropertyDbContext _dbContext;
        private readonly PostRepository _postRepository;
        private readonly ILogger<PostsController> _logger;
        private const int _defaultLimit = 100;

        public PostsController(ThaipropertyDbContext dbContext, ILogger<PostsController> logger)
        {
            _dbContext = dbContext;
            _postRepository = new PostRepository(dbContext);
            _logger = logger;
        }

        [HttpGet("{limit?}")] // /api/posts
        public IActionResult Get(int limit = _defaultLimit)
        {
            var result = _postRepository.GetPostList()
                .OrderByDescending(post => post.PostId)
                .Take(limit);
            if (result == null)
            {
                // HttpContext.Response.StatusCode = StatusCodes.Status204NoContent;
                return NotFound();
            }
            return Json(result.ToList());
        }

        [HttpGet("{PostID}")] // /api/posts/212345
        public async Task<IActionResult> GetPost(int PostID)
        {
            var result = await _dbContext.PropPost
              .AsNoTracking()
              .Include(p => p.PropOption)
              .Include(p => p.PropImages)
              .Include(p => p.PropPlaces)
              .Include(p => p.Project)
              .Select(p => new PostDetail
              {
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
                  PropImages = p.PropImages.Select(image => new PropertyImage()
                  {
                      ImageId = image.ImageId,
                      ImageFileName = image.ImageFileName,
                  }).ToList(),
                  PropPlaces = p.PropPlaces.Select(place => new PropertyPlace()
                  {
                      PlaceId = place.PlaceId,
                      PlaceName = _dbContext.Place.FirstOrDefault(_p => _p.PlaceId == place.PlaceId).PlaceNameTh
                  }).ToList(),
                  Comments = p.Comments,
                  Location = new Location
                  {
                      Lat = p.LocationX,
                      Lng = p.LocationY
                  },
                  Project = new ProjectListViewModel
                  {
                      ProjectId = p.Project.ProjectId,
                      ProjectName = p.Project.ProjectName,
                      ProjectNameEn = p.Project.ProjectNameEn,
                      // ProjectImageUrl = p.Project.ProjectImageUrl,
                      CompanyId = p.Project.CompanyId
                  },
              })
              .SingleOrDefaultAsync(post => post.PostId == PostID);
            if (result == null)
            {
                // HttpContext.Response.StatusCode = StatusCodes.Status204NoContent;
                return NotFound();
            }
            // var PlaceNameList = dbContext.Place.Where(p => p.PlaceId == result.PropPlaces.)
            return Json(result);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] int typeId, [FromQuery] int districId, [FromQuery] int bedRoom, [FromQuery] int limitResult = _defaultLimit)
        {
            var result = _postRepository.GetPostList();

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
            if (result == null)
            {
                // HttpContext.Response.StatusCode = StatusCodes.Status204NoContent;
                // return Json(new Object());
                return NotFound();
            }

            var filteredResult = await result
                .OrderByDescending(post => post.PostId)
                .Take(limitResult)
                .ToListAsync();
            return Json(filteredResult);
        }


    }
}