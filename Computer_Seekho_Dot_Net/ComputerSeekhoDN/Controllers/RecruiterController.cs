using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/recruiter")]
	[ApiController]
	public class RecruiterController : ControllerBase
	{
		private readonly IRecruiterService service;
		public RecruiterController(IRecruiterService service) { this.service = service; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Recruiter>>> getAll()
		{
			return Ok(await service.getAllRecruiters());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Recruiter>> getById(int id)
		{
			return Ok(await service.getRecruiterById(id));
		}

		[HttpPost("add")]
		public async Task<ActionResult> addRecruiter([FromBody] Recruiter recruiter)
		{
			if (recruiter == null) return BadRequest(new { message = "Invalid Details" });
			await service.addRecruiter(recruiter);
			return Ok(new { message = "Recruiter Added" });
		}

		[HttpPut("update")]
		public async Task<ActionResult> updateRecruiter([FromBody] Recruiter recruiter)
		{
			if (recruiter == null) return BadRequest(new { message = "Invalid Details" });
			await service.updateRecruiter(recruiter);
			return Ok(new { message = "Recruiter Updated" });
		}

		[HttpDelete("delete/{id}")]
		public async Task<ActionResult> deleteRecruiter(int id)
		{
			await service.deleteRecruiter(id);
			return Ok(new { message = "Recruiter delete" });
		}
	}
}
