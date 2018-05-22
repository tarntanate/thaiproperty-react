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
  public class ProjectController : Controller
  {
    private readonly ThaipropertyDbContext _dbContext;
    private const string ServerUrl = "http://www.thaiproperty.in.th";
    private const string ImageFolder = "images";
    private const string ThumbnailSize = "200x150";
    private const string ThumbnailQuality = "80";

    enum PropertyType
    {
      Home = 2,
      Townhouse = 3,
      Condominium = 4
    }

    public ProjectController(ThaipropertyDbContext dbContext)
    {
      this._dbContext = dbContext;
    }

    [HttpGet("{limitResult?}")]
    public IActionResult AllProjects(int limitResult = 300)
    {
      var result = _dbContext.NewProject
        .AsNoTracking()
        // .Include(p => p.Type)
        // .Include(p => p.Province)
        .Select(p => new NewProjectView
        {
          ProjectId = p.ProjectId,
          ProjectTypeId = p.TypeId,
          ProjectName = p.ProjectName,
          ProjectNameEn = p.ProjectNameEn,
          // ProjectImageUrl = p.ProjectImageUrl,
          CompanyId = p.CompanyId,
          TotalPost = _dbContext.PropPost.Count(post => post.ProjectId == p.ProjectId),
          Location = new Location
          {
            Lat = p.LocationX,
            Lng = p.LocationY
          },
          ThumbnailUrl = $"{ServerUrl}/images/project/{p.ProjectId}.jpg",
        })
        .OrderByDescending(p => p.TotalPost)
        .Take(limitResult);
      if (result == null)
      {
        // HttpContext.Response.StatusCode = StatusCodes.Status204NoContent;
        return NotFound();
      }
      return Json(result.ToList());
    }

    [HttpGet("{limitResult?}")]
    [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any, NoStore = false)]
    public IActionResult AllProjectsWithAvgPrice(int limitResult = 200)
    {
      var result = _dbContext.NewProject
        .AsNoTracking()
        // .Include(p => p.Type)
        // .Include(p => p.Province)
        .Select(p => new
        {
          ProjectId = p.ProjectId,
          ProjectTypeId = p.TypeId,
          ProjectName = p.ProjectName,
          ProjectNameEn = p.ProjectNameEn,
          // ProjectImageUrl = p.ProjectImageUrl,
          CompanyId = p.CompanyId,
          TotalPost = _dbContext.PropPost.Count(post => post.ProjectId == p.ProjectId),
          // AvgPrice = dbContext.PropPost.Where(post => post.ProjectId == p.ProjectId && post.ForRent == false).Average(post => post.Price),
          // AvgArea = dbContext.PropPost.Where(post => post.ProjectId == p.ProjectId && post.ForRent == false).Average(post => post.Area),
          AvgPricePerArea =
            _dbContext.PropPost.Where(post => post.ProjectId == p.ProjectId && post.ForRent == false).Average(post => post.Price) /
            _dbContext.PropPost.Where(post => post.ProjectId == p.ProjectId && post.ForRent == false).Average(post => post.Area),
          Location = new Location
          {
            Lat = p.LocationX,
            Lng = p.LocationY
          },
          ThumbnailUrl = $"{ServerUrl}/images/project/{p.ProjectId}.jpg",
        })
        .Where(p => p.TotalPost > 0 && p.ProjectTypeId == (int)PropertyType.Condominium && p.Location.Lat.HasValue && p.AvgPricePerArea.HasValue)
        .OrderByDescending(p => p.TotalPost)
        .Take(limitResult);
      if (result == null)
      {
        // HttpContext.Response.StatusCode = StatusCodes.Status204NoContent;
        return NotFound();
      }
      // foreach (var item in result)
      // {
      //     item.AvgPricePerArea = item.AvgPrice / item.AvgArea;
      // }
      return Json(result.Where(p => p.TotalPost > 0 && p.AvgPricePerArea.HasValue).ToList());
      // return Json(result.ToList().OrderByDescending(p => p.AvgPricePerArea));
    }

    [HttpGet]
    public IActionResult Search([FromQuery] string keyword)
    {
      if (keyword == null || keyword.Length < 2)
        return Ok();
      var result = _dbContext.NewProject
        .AsNoTracking()
        // .Include(p => p.Type)
        // .Include(p => p.Province)
        .Select(p => new NewProjectView
        {
          ProjectId = p.ProjectId,
          ProjectTypeId = p.TypeId,
          ProjectName = p.ProjectName,
          ProjectNameEn = p.ProjectNameEn,
          Location = new Location
          {
            Lat = p.LocationX,
            Lng = p.LocationY
          },
          // ProjectImageUrl = p.ProjectImageUrl,
          CompanyId = p.CompanyId,
          ThumbnailUrl = $"{ServerUrl}/images/project/{p.ProjectId}.jpg",
        })
        .Where(p => p.ProjectName.IndexOf(keyword) >= 0 || p.ProjectNameEn.IndexOf(keyword) >= 0)
        .OrderBy(p => p.ProjectName)
        .Take(50);
      if (result == null)
      {
        // HttpContext.Response.StatusCode = StatusCodes.Status204NoContent;
        return NotFound();
      }
      return Json(result.ToList());
    }
  }
}