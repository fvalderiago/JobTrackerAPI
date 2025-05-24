using JobTrackerAPI.Models;
using JobTrackerAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace JobTrackerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationsController : ControllerBase
    {
        private readonly IJobApplicationRepository _repository;

        public ApplicationsController(IJobApplicationRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _repository.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var app = await _repository.GetByIdAsync(id);
            return app is null ? NotFound() : Ok(app);
        }

        [HttpPost]
        public async Task<IActionResult> Create(JobApplication application)
        {
            var created = await _repository.AddAsync(application);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, JobApplication application)
        {
            if (id != application.Id) return BadRequest();
            var updated = await _repository.UpdateAsync(application);
            return updated is null ? NotFound() : Ok(updated);
        }
    }
}
