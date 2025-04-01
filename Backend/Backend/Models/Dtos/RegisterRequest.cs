using System.ComponentModel.DataAnnotations;
using Backend.Models.Database.Entities;

namespace Backend.Models.Dtos;

public class RegisterRequest
{
      [EmailAddress]
      public required string Mail {get; set;}
      public required string Password {get; set;}
      public required string Name {get; set;}
      public string LastName {get; set;}
      public string Biography { get; set; }
      public string School { get; set; }
      public string Degree { get; set; }
      public string Nationality { get; set; }
      public IFormFile? File { get; set; }


    [Phone]
      public required string Phone {get; set;}
      public List<SocialMediaLink> SocialMedias { get; set; } = new List<SocialMediaLink>();


}
