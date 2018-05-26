using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Thaiproperty.Models;
using Thaiproperty.Repositories;
using Thaiproperty.ViewModels;

namespace Thaiproperty.Controllers
{
    [Route("api/[controller]")]
    public class ProjectsController : Controller
    {
        private readonly ProjectRepository _projectRepository;
        private readonly ILogger<ProjectsController> _logger;
        private const int _defaultLimit = 200;

        public ProjectsController(ThaipropertyDbContext dbContext, ILogger<ProjectsController> logger)
        {
            _projectRepository = new ProjectRepository(dbContext);
            _logger = logger;
        }

        [HttpGet("{limit?}")]
        public async Task<IActionResult> Get(int limit = _defaultLimit)
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

        [HttpGet("WithAvgPrice/{limit?}")]
        [ResponseCache(Duration = 300, Location = ResponseCacheLocation.Any, NoStore = false)]
        public IActionResult WithAvgPrice(int limit = _defaultLimit)
        {
            var result = _projectRepository.GetProjectListWithAvgPrice()
                .Where(p => p.TotalPost > 0 
                    && p.ProjectTypeId == (int)Thaiproperty.Enum.PropertyType.Condominium 
                    && p.Location.Lat.HasValue
                    && p.AvgPricePerArea >= 0)
                .OrderByDescending(p => p.TotalPost)
                .Take(limit)
                .ToList()
                .OrderBy(p => p.AvgPricePerArea);

            if (result == null)
            {
                return NotFound();
            }
            // foreach (var item in result)
            // {
            //     item.AvgPricePerArea = item.AvgPrice / item.AvgArea;
            // }
            return Json(result);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> Search([FromQuery] string name)
        {
            if (name == null || name.Length < 2)
                return BadRequest();

            var result = await _projectRepository.GetProjectList()
                .Where(p => p.ProjectName.IndexOf(name) >= 0 || p.ProjectNameEn.IndexOf(name) >= 0)
                .OrderBy(p => p.ProjectName)
                .Take(_defaultLimit)
                .ToListAsync();

            if (result == null)
            {
                return NotFound();
            }
            return Json(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] NewProject project)
        {
            return Json(project);
        }

        [HttpGet]
        [Route("Test")]
        public IActionResult Test([FromBody] NewProject project)
        {
            Common.IUser user1 = new Common.User();
            user1.firstName = "Tom";
            user1.lastName = "Memanee";
            _logger.LogCritical(user1.ToString());
            return Json(user1);
        }
    }
}