using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/album")]
	[ApiController]
	public class AlbumController : ControllerBase
	{
		private readonly IAlbumService service;
		public AlbumController(IAlbumService service){ this.service = service; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Album>>> getAllAlbums()
		{
			return Ok(await service.getAllAlbums());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Album>> getById(int id)
		{
			return Ok(await service.getAlbumById(id));
		}

		[HttpPost("add")]
		public async Task<ActionResult> addAlbum([FromBody] Album album)
		{
			if (album == null) return BadRequest(new { message = "Invalid Album Details"});
			await service.addAlbum(album);
			return Ok(new { message = "Album added" });
		}

		[HttpPut("update")]
		public async Task<ActionResult> updateAlbum([FromBody] Album album) {
			if (album == null) return BadRequest(new { message = "Invalid Album details" });
			await service.updateAlbum(album);
			return Ok(new { message = "Album Updated"});
		}

		[HttpDelete("delete/{id}")]
		public async Task<ActionResult> deleteAlbum(int id)
		{
			await service.deleteAlbum(id);
			return Ok(new { message = "Album deleted" });
		}
	}
}
