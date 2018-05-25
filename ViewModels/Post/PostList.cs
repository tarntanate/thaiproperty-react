using System;
using System.Collections.Generic;
using Thaiproperty.Common;
using Thaiproperty.Models;

namespace Thaiproperty.ViewModels.Post
{
    public class PostList
    {
        public PostList()
        {
            // Comments = new HashSet<Comment>();
            // PropImages = new HashSet<PropImage>();
            // PropPlaces = new HashSet<PropPlace>();
        }

        public int PostId { get; set; }
        public string Title { get; set; }
        public int Price { get; set; }
        public int? Deposit { get; set; }
        public bool IsForRent { get; set; }
        public string ForRentText { get; set; }
        public byte BathRoom { get; set; }
        public byte BedRoom { get; set; }
        public byte Floor { get; set; }
        public short? Area { get; set; }
        public byte? AreaUnit { get; set; }
        public int TypeId { get; set; }
        public int MemberId { get; set; }
        public string LogoImageFile { get; set; }
        public int TotalView { get; set; }
        public string ThumbnailUrl { get; set; }
        public DateTime PostDate { get; set; }
        public DateTime? SponsorExpireDate { get; set; }
        public string ContactName { get; set; }
        public int? ProjectId { get; set; }
        public Member Member { get; set; }
        public NewProject Project { get; set; }
        public District District { get; set; }
        public Province Province { get; set; }
        public PropertyType Type { get; set; }
        public Location Location { get; set; }
        // public string PostUrl { get; set; }
        // public PropOption PropOption { get; set; }
        // public ICollection<Comment> Comments { get; set; }
        // public ICollection<PropImage> PropImages { get; set; }
        // public ICollection<PropPlace> PropPlaces { get; set; }
    }
}