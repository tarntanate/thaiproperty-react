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
    public class DistrictsController : Controller
    {
        private readonly ThaipropertyDbContext _dbContext;

        public DistrictsController(ThaipropertyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet] // /api/districts
        public async Task<IActionResult> Get()
        {
            var result = _dbContext.District
                .AsNoTracking()
                .Select(d => new {
                    id = d.DistrictId,
                    name = d.DistrictName,
                    provinceId = d.ProvinceId,
                });
            return Json(await result.ToListAsync());
        }
    }
}