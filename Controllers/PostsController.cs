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
        private readonly PostRepository _postRepository;
        private readonly ILogger<PostsController> _logger;
        private const int _defaultLimit = 500;

        public PostsController(ThaipropertyDbContext dbContext, ILogger<PostsController> logger)
        {
            _postRepository = new PostRepository(dbContext);
            _logger = logger;
        }

        [HttpGet] // /api/posts
        public async Task<IActionResult> GetAll(int limit = _defaultLimit, [FromQuery] int typeId = 0, [FromQuery] bool? forRent = null)
        {
            var result = _postRepository.GetPostList();
            
            if (typeId > 0)
                result = result.Where(p => p.TypeId == typeId);
            
            if (forRent.HasValue)
            {
                result = result.Where(p => p.IsForRent == forRent.Value);
            }
            
            if (result == null)
            {
                return NotFound();
            }

            result = result
                .OrderByDescending(post => post.PostId)
                .Take(limit);
            return Json(await result.ToListAsync());
        }

        [HttpGet("{PostID}")] // /api/posts/212345
        public async Task<IActionResult> GetPost(int PostId)
        {
            var result = await _postRepository.GetPost(PostId);

            if (result == null)
            {
                return NotFound();
            }
            return Json(result);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] int typeId, [FromQuery] int districId, [FromQuery] int bedRoom, [FromQuery] int limit = _defaultLimit)
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
                return NotFound();
            }

            var filteredResult = await result
                .OrderByDescending(post => post.PostId)
                .Take(limit)
                .ToListAsync();
            return Json(filteredResult);
        }
    }
}