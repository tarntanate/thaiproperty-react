using Microsoft.EntityFrameworkCore;
using System.Linq;
using Thaiproperty.Common;
using Thaiproperty.Models;
using Thaiproperty.ViewModels.Project;

namespace Thaiproperty.Repositories
{
    public class ProjectRepository
    {
        private readonly ThaipropertyDbContext _dbContext;

        public ProjectRepository(ThaipropertyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<ProjectListViewModel> GetProjectList()
        {
            return _dbContext.NewProject
                .AsNoTracking()
                // .Include(p => p.Type)
                // .Include(p => p.Province)
                .Select(p => new ProjectListViewModel
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
                    ThumbnailUrl = $"{Settings.ServerUrl}/images/project/{p.ProjectId}.jpg",
                });
        }

        public IQueryable<ProjectListViewModel> GetProjectListWithAvgPrice()
        {
            return _dbContext.NewProject
                .AsNoTracking()
                // .Include(p => p.Type)
                // .Include(p => p.Province)
                .Select(p => new ProjectListViewModel
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
                    (
                        // Calculate price per sqm. from post
                        _dbContext.PropPost.Where(post => post.ProjectId == p.ProjectId && post.ForRent == false).Average(post => post.Price) /
                        _dbContext.PropPost.Where(post => post.ProjectId == p.ProjectId && post.ForRent == false).Average(post => post.Area)
                    ),
                    Location = new Location
                    {
                        Lat = p.LocationX,
                        Lng = p.LocationY
                    },
                    ThumbnailUrl = $"{Settings.ServerUrl}/{Settings.ImageFolder}/project/{p.ProjectId}.jpg",
                });
        }
    }
}