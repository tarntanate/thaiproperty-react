using System;
using System.Collections.Generic;
using Thaiproperty.Common;
using Thaiproperty.Models;
using Thaiproperty.ViewModels.Project;

namespace Thaiproperty.ViewModels.Post
{
    public class PropertyImage
    {
        public int ImageId { get; set; }
        public string ImageFileName { get; set; }
    }
    public class PropertyPlace
    {
        public int PlaceId { get; set; }
        public string PlaceName { get; set; }
    }

    public class PostDetail
    {
        public PostDetail()
        {
            Comments = new HashSet<Comment>();
            PropImages = new HashSet<PropertyImage>();
            PropPlaces = new HashSet<PropertyPlace>();
        }

        public int PostId { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        public bool IsForRent { get; set; }
        public string ForRentText { get; set; }
        public byte BathRoom { get; set; }
        public byte BedRoom { get; set; }
        public byte Floor { get; set; }
        public short? Area { get; set; }
        public byte? AreaUnit { get; set; }
        public string Details { get; set; }
        public string Telephone { get; set; }
        public int MemberId { get; set; }
        public string LogoImageFile { get; set; }
        public Location Location { get; set; }
        public int TotalView { get; set; }
        public string IPCreator { get; set; }
        public DateTime PostDate { get; set; }
        public DateTime ExpireDate { get; set; }
        public string EmailAddress { get; set; }
        public string ContactName { get; set; }
        public int? Deposit { get; set; }
        public DateTime? SponsorExpireDate { get; set; }
        public ProjectListViewModel Project { get; set; }
        public District District { get; set; }
        public Member Member { get; set; }
        public Province Province { get; set; }
        public Models.PropertyType Type { get; set; }
        public PropOption PropOption { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<PropertyImage> PropImages { get; set; }
        public ICollection<PropertyPlace> PropPlaces { get; set; }
    }

}