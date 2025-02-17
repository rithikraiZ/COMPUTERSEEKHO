using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/video")]
	[ApiController]
	public class VideoController : ControllerBase
	{
		private readonly IVideoService service;
		public VideoController(IVideoService service) { this.service = service; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Video>>> getAll()
		{
			return Ok(await service.getAllVideos());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Video>> getById(int id)
		{
			return Ok(await service.getVideoById(id));
		}

		[HttpPost("add")]
		public async Task<ActionResult> addVideo([FromBody] Video video)
		{
			if (video == null) return BadRequest(new { message = "Invalid Details" });
			await service.addVideo(video);
			return Ok(new { message = "Video Added" });
		}

		[HttpPut("update")]
		public async Task<ActionResult> updateVideo([FromBody] Video video)
		{
			if (video == null) return BadRequest(new { message = "Invalid Details" });
			await service.addVideo(video);
			return Ok(new { message = "Video Updated" });
		}

		[HttpDelete("delete/{id}")]
		public async Task<ActionResult> deleteVideo(int id)
		{
			await service.deleteVideo(id);
			return Ok(new { message = "Video delete" });
		}
	}
}
