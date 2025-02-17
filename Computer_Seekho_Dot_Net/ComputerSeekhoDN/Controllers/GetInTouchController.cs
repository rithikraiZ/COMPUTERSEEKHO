using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/getInTouch")]
	[ApiController]
	public class GetInTouchController : ControllerBase
	{
		private readonly IGetInTouchService service;
		public GetInTouchController(IGetInTouchService service) { this.service = service; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<GetInTouch>>> getAll()
		{
			return Ok(await service.getAllGetInTouch());
		}

		[HttpPost("add")]
		public async Task<ActionResult> addGetInTouch([FromBody] GetInTouch getInTouch)
		{
			if (getInTouch == null) return BadRequest(new { message = "Invalid Details"});
			await service.addGetInTouch(getInTouch);
			return Ok(new { message = "Get In Touch added"});
		}

		[HttpDelete("delete/{id}")]
		public async Task<ActionResult> deleteGetInTouch(int id)
		{
			await service.deleteGetInTouch(id);
			return Ok(new { message = "Get In Touch deleted" });
		}
	}
}
