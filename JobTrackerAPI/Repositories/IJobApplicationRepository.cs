using JobTrackerAPI.Models;

namespace JobTrackerAPI.Repositories
{
    public interface IJobApplicationRepository
    {
        Task<IEnumerable<JobApplication>> GetAllAsync();
        Task<JobApplication?> GetByIdAsync(int id);
        Task<JobApplication> AddAsync(JobApplication application);
        Task<JobApplication?> UpdateAsync(JobApplication application);
    }
}
