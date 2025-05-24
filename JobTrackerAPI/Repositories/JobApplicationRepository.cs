using JobTrackerAPI.Data;
using JobTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly ApplicationDbContext _context;

        public JobApplicationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<JobApplication>> GetAllAsync() => await _context.JobApplications.ToListAsync();

        public async Task<JobApplication?> GetByIdAsync(int id) => await _context.JobApplications.FindAsync(id);

        public async Task<JobApplication> AddAsync(JobApplication application)
        {
            _context.JobApplications.Add(application);
            await _context.SaveChangesAsync();
            return application;
        }

        public async Task<JobApplication?> UpdateAsync(JobApplication application)
        {
            var existing = await _context.JobApplications.FindAsync(application.Id);
            if (existing == null) return null;
            
            existing.CompanyName = application.CompanyName;
            existing.Position = application.Position;
            existing.Status = application.Status;
            existing.DateApplied = application.DateApplied;
            await _context.SaveChangesAsync();

            return existing;
        }
    }
}
