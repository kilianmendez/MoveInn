using Backend.Models.Database.Entities;
using Backend.Services;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models.Database.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(DataContext context) : base(context)
        {

        }

        public async Task<User?> GetUserDataByIdAsync(Guid id)
        {
            return await GetQueryable().Where(user => user.Id == id)
                .Include(user => user.Name)
                .Include(user => user.LastName)
                .Include(user => user.Mail)
                .Include(user => user.Role)
                .Include(user => user.Biography)
                .Include(user => user.AvatarUrl)
                .Include(user => user.School)
                .Include(user => user.Degree)
                .Include(user => user.Nationality)
                .Include(user => user.Phone)
                .Include(user => user.SocialMedias)
                .SingleOrDefaultAsync();
        }

        public async Task<User?> GetByMailAsync(string mail)
        {
            return await GetQueryable()
            .Where(user => user.Mail == mail).SingleOrDefaultAsync();
        }
        public Task<bool> IsLoginCorrect(string mail, string password)
        {
            string hashedPassword = AuthService.HashPassword(password);
            return _unitOfWork.UserRepository.IsLoginCorrect(mail.ToLowerInvariant(), hashedPassword);
        }


    }
}
