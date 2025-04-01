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
                .Include(u => u.Accommodations)
                .Include(user => user.SocialMedias)
                .SingleOrDefaultAsync();
        }

        public async Task<User?> GetByMailAsync(string mail)
        {
            return await GetQueryable()
            .Where(user => user.Mail == mail).SingleOrDefaultAsync();
        }

        public async Task<bool> IsLoginCorrect(string mail, string password)
        {
            User? existedUser = await GetByMailAsync(mail);
            if (existedUser == null)
            {
                return false;
            }
            string hashedPassword = AuthService.HashPassword(password);
            return existedUser.Password == hashedPassword;
        }


    }
}
