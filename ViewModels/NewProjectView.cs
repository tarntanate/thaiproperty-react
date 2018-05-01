namespace Thaiproperty.ViewModels
{
  public class NewProjectView
  {
    public int ProjectId { get; set; }
    public int? ProjectTypeId { get; set; }
    public int CompanyId { get; set; }
    public string ProjectName { get; set; }
    public string ProjectNameEn { get; set; }
    public string ThumbnailUrl { get; set; }
    public int TotalPost { get; set; }
    public Location Location { get; set; }
  }
}