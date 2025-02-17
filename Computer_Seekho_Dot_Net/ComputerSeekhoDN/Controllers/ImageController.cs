using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/image")]
	[ApiController]
	public class ImageController : ControllerBase
	{
		private readonly IImageService service;
		public ImageController(IImageService service) { this.service = service; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Image>>> getAll() {
			return Ok(await service.getAllImages());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Image>> getById(int id)
		{
			return Ok(await service.getImageById(id));
		}

		[HttpPost("add")]
		public async Task<ActionResult> addImage([FromBody] Image image)
		{
			if (image == null) return BadRequest(new { message = "Invalid Details"});
			await service.addImage(image);
			return Ok(new { message = "Image Added"});
		}

		[HttpPut("update")]
		public async Task<ActionResult> updateImage([FromBody] Image image)
		{
			if (image == null) return BadRequest(new { message = "Invalid Details"});
			await service.updateImage(image);
			return Ok(new { message = "Image Updated"});
		}

		[HttpDelete("delete/{id}")]
		public async Task<ActionResult> deleteImage(int id)
		{
			await service.deleteImage(id);
			return Ok(new { message = "Image delete" });
		}
	}
}
