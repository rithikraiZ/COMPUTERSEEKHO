using ComputerSeekho.Services;
using ComputerSeekhoDN.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/closureReason")]
	[ApiController]
	public class ClosureReasonController : ControllerBase
	{
		private readonly IClosureReasonService service;

		public ClosureReasonController(IClosureReasonService service) { this.service = service; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<ClosureReason>>> getAllClosureReasons()
		{
			return Ok(await service.GetAllClosureReasons());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult> getById(int id)
		{
			return Ok(await service.GetById(id));
		}

		[HttpPost("add")]
		public async Task<ActionResult> addClosureReason([FromBody] ClosureReason closureReason)
		{
			if (closureReason == null) return BadRequest(new { message = "Invalid Data"});
			await service.Add(closureReason);
			return Ok(new { message = "Closure Added"});
		}

		[HttpPut("update")]
		public async Task<ActionResult> updateClosure([FromBody] ClosureReason closureReason)
		{
			if (closureReason == null) return BadRequest(new { message = "Invalid Data"});
			await service.Update(closureReason);
			return Ok(new { message = "Closure Updated"});
		}

		[HttpDelete("delete/{id}")]
		public async Task<ActionResult> deleteClosure(int id)
		{
			await service.Delete(id);
			return Ok(new { message = "Closure Deleted"});
		}
	}
}
