using Backend.Models.Database.Entities;
using Backend.Models.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Models.Database.Repositories;

public class ForumRepository : IForumRepository
{
    private readonly DataContext _context;
    public ForumRepository(DataContext context)
    {
        _context = context;
    }

    public async Task CreateReviewAsync(Forum forum)
    {
        await _context.Forum.AddAsync(forum);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Forum>> GetAllForumsAsync()
    {
        return await _context.Forum
            .ToListAsync();
    }

}
