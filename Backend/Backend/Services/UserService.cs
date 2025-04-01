using System.Net;
using Backend.Models.Database;
using Backend.Models.Database.Entities;
using Backend.Models.Database.Enum;
using Backend.Models.Dtos;

namespace Backend.Services
{
    public class UserService
    {
        private readonly UnitOfWork _unitOfWork;

        public UserService(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        /*<------------->GET<------------->*/
        public async Task<User?> GetUserByIdAsync(Guid id)
        {
            return await _unitOfWork.UserRepository.GetUserDataByIdAsync(id);
        }

        public async Task<User?> GetUserByMailAsync(string mail)
        {
            return await _unitOfWork.UserRepository.GetByMailAsync(mail);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            IEnumerable<User> users = await _unitOfWork.UserRepository.GetAllAsync();
            return users;
        }

        public Task<bool> IsLoginCorrect(string mail, string password)
        {
            return _unitOfWork.UserRepository.IsLoginCorrect(mail.ToLowerInvariant(), password);
        }



        /*<------------->POST<------------->*/
        public async Task<User> InsertAsync(User user)
        {
            await _unitOfWork.UserRepository.InsertAsync(user);
            await _unitOfWork.SaveAsync();

            return user;
        }
        public async Task<User> InsertByMailAsync(RegisterRequest userRequest)
        {
            User newUser = new User
            {
                Id = Guid.NewGuid(),
                Mail = userRequest.Mail.ToLowerInvariant(),
                Password = AuthService.HashPassword(userRequest.Password),
                Name = userRequest.Name,
                LastName = userRequest.LastName,
                Phone = userRequest.Phone,
                Role = Role.User,
                Biography = userRequest.Biography,
                School = userRequest.School,
                Degree = userRequest.Degree,
                Nationality = userRequest.Nationality,
                SocialMedias = userRequest.SocialMedias.Select(sm => new SocialMediaLink
                {
                    SocialMedia = sm.SocialMedia,
                    Url = sm.Url
                }).ToList()
            };

            if (userRequest.File != null)
            {
                try
                {
                    newUser.AvatarUrl = await StoreImageAsync(userRequest.File, userRequest.Name);
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al guardar la imagen: " + ex.Message);
                }
            }
            else
            {
                newUser.AvatarUrl = Path.Combine("images", "default.png").Replace("\\", "/");
            }
            return await InsertAsync(newUser);
        }



        /*<------------->UPDATE<------------->*/




        /*<------------->DELETE<------------->*/

        /*<------------->IMAGES<------------->*/
        public async Task<string> StoreImageAsync(IFormFile file, string modelName)
        {
            var validImageTypes = new[] { "image/jpeg", "image/png", "image/gif", "image/webp" };

            if (!validImageTypes.Contains(file.ContentType))
            {
                throw new ArgumentException("El archivo no es un formato de imagen válido.");
            }

            string fileExtension = Path.GetExtension(file.FileName);
            string fileName = modelName + fileExtension;

            string imagesFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            string filePath = Path.Combine(imagesFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Path.Combine("images", fileName).Replace("\\", "/");
        }
    }
}
