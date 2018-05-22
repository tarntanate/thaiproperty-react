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
        private const int _defaultLimit = 200;

        public ProjectsController(ThaipropertyDbContext dbContext)
        {
            _projectRepository = new ProjectRepository(dbContext);
        }

        [HttpGet("{limit?}")]
        public async Task<IActionResult> All(int limit = _defaultLimit)
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
        public async Task<IActionResult> CondominiumWithAvgPrice(int limit = _defaultLimit)
        {
            var result = await _projectRepository.GetProjectListWithAvgPrice()
                .Where(p => p.TotalPost > 0 
                    && p.ProjectTypeId == (int)Thaiproperty.Enum.PropertyType.Condominium 
                    && p.Location.Lat.HasValue 
                    && p.AvgPricePerArea.HasValue)
                .OrderByDescending(p => p.TotalPost)
                .Take(limit)
                .Where(p => p.TotalPost > 0 && p.AvgPricePerArea.HasValue)
                .ToListAsync();

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

        [HttpGet]
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
    }
}