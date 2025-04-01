using Backend.Models.Database.Entities;
using Backend.Models.Dtos;

namespace Backend.Models.Mappers
{
    public static class UserMapper
    {
        public static UserDto ToDto(User user)
        {
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Mail = user.Mail,
                Role = user.Role,
                Biography = user.Biography,
                AvatarUrl = user.AvatarUrl,
                School = user.School,
                Degree = user.Degree,
                Nationality = user.Nationality,
                Phone = user.Phone,
                SocialMedias = user.SocialMedias
            };
        }

        public static User ToEntity(UserDto dto, string password = "")
        {
            if (dto == null) return null;

            return new User
            {
                Id = dto.Id,
                Name = dto.Name,
                LastName = dto.LastName,
                Mail = dto.Mail,
                Role = dto.Role,
                Biography = dto.Biography,
                AvatarUrl = dto.AvatarUrl,
                School = dto.School,
                Degree = dto.Degree,
                Nationality = dto.Nationality,
                Phone = dto.Phone,
                SocialMedias = dto.SocialMedias,
                Password = password // Recuerda asignar la contraseña si es necesario
            };
        }
    }
}
