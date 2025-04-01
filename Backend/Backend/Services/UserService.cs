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
            string hashedPassword = AuthService.HashPassword(password);
            return _unitOfWork.UserRepository.IsLoginCorrect(mail.ToLowerInvariant(), hashedPassword);
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
                AvatarUrl = userRequest.AvatarUrl,
                School = userRequest.School,
                Degree = userRequest.Degree,
                Nationality = userRequest.Nationality,
                SocialMedias = userRequest.SocialMedias.Select(sm => new SocialMediaLink
                {
                    SocialMedia = sm.SocialMedia,
                    Url = sm.Url
                }).ToList()
            };

             return await InsertAsync(newUser);
            }



        /*<------------->UPDATE<------------->*/




        /*<------------->DELETE<------------->*/
    }
}
