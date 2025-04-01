using System.Net;
using Backend.Models.Database;
using Backend.Models.Database.Entities;
using Backend.Models.Database.Enum;
using Backend.Models.Dtos;
using Backend.Models.Mappers;

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
        public async Task<UserDto?> GetUserByIdAsync(Guid id)
        {
            User? user = await _unitOfWork.UserRepository.GetUserDataByIdAsync(id);
            return user != null ? UserMapper.ToDto(user) : null;
        }

        public async Task<UserDto?> GetUserByMailAsync(string mail)
        {
            User? user = await _unitOfWork.UserRepository.GetByMailAsync(mail);
            return user != null ? UserMapper.ToDto(user) : null;
        }

        public async Task<IEnumerable<UserDto>> GetAllAsync()
        {
            IEnumerable<User> users = await _unitOfWork.UserRepository.GetAllAsync();
            return users.Select(user => UserMapper.ToDto(user));
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

        public async Task<User?> UpdateUserAsync(Guid id, UpdateUserRequest request)
        {
            User? user = await _unitOfWork.UserRepository.GetByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            if (request.Mail != null)
            {
                user.Mail = request.Mail.ToLowerInvariant();
            }
            if (request.Name != null)
            {
                user.Name = request.Name;
            }
            if (request.LastName != null)
            {
                user.LastName = request.LastName;
            }
            if (request.Biography != null)
            {
                user.Biography = request.Biography;
            }
            if (request.School != null)
            {
                user.School = request.School;
            }
            if (request.Degree != null)
            {
                user.Degree = request.Degree;
            }
            if (request.Nationality != null)
            {
                user.Nationality = request.Nationality;
            }
            if (request.Phone != null)
            {
                user.Phone = request.Phone;
            }
            if (request.SocialMedias != null && request.SocialMedias.Any())
            {
                user.SocialMedias = request.SocialMedias;
            }

            if (!string.IsNullOrWhiteSpace(request.Password))
            {
                user.Password = AuthService.HashPassword(request.Password);
            }

            if (request.File != null)
            {
                try
                {
                    string imageName = request.Name ?? user.Name;
                    user.AvatarUrl = await StoreImageAsync(request.File, imageName);
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al guardar la imagen: " + ex.Message);
                }
            }

            await _unitOfWork.UserRepository.UpdateAsync(user);
            bool saved = await _unitOfWork.SaveAsync();
            return saved ? user : null;
        }





        /*<------------->DELETE<------------->*/
        public async Task<bool> DeleteAsyncUserById(Guid id)
        {
            User user = await _unitOfWork.UserRepository.GetByIdAsync(id);
            await _unitOfWork.UserRepository.DeleteAsync(user);

            return await _unitOfWork.SaveAsync();
        }

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
