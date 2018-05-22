using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thaiproperty.Models;
using Thaiproperty.Repositories;
using Thaiproperty.ViewModels;

namespace Thaiproperty.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ProjectsController : Controller
    {
        private readonly ProjectRepository _projectRepository;

        public ProjectsController(ThaipropertyDbContext dbContext)
        {
            _projectRepository = new ProjectRepository(dbContext);
        }

        [HttpGet("{limit?}")]
        public async Task<IActionResult> Get(int limit = 300)
        {
            var result = await _projectRepository.GetProjectList()
                .OrderByDescending(p => p.TotalPost)
                .Take(limit)
                .ToListAsync();
            if (result == null)
            {
                return NotFound();
            }
            return Json(result);
        }

        [HttpGet("{limit?}")]
        [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any, NoStore = false)]
        public IActionResult AllWithAvgPrice(int limit = 200)
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
              .Take(limit);
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
        public async Task<IActionResult> Search([FromQuery] string name)
        {
            if (name == null || name.Length < 2)
                return BadRequest();

            var result = await _projectRepository.GetProjectList()
                .Where(p => p.ProjectName.IndexOf(name) >= 0 || p.ProjectNameEn.IndexOf(name) >= 0)
                .OrderBy(p => p.ProjectName)
                .Take(50)
                .ToListAsync();
                
            if (result == null)
            {
                return NotFound();
            }
            return Json(result);
        }
    }
}