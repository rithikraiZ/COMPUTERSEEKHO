using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/batch")]
	[ApiController]
	public class BatchController : ControllerBase
	{
		private readonly IBatchService service;
		public BatchController(IBatchService service) { this.service = service; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Batch>>> GetAll() {
			return Ok(await service.getAllBatches());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Batch>> getById(int id)
		{
			return Ok(await service.getBatchById(id));
		}
		
		[HttpGet("getByName/{batchName}")]
		public async Task<ActionResult<Batch>> getByName(string batchName)
		{
			return Ok(await service.findByBatchName(batchName));
		}

		[HttpPut("update")]
		public async Task<ActionResult> updateBatch([FromBody] Batch batch)
		{
			if (batch == null) return BadRequest(new { message = "Invalid Batch data" });
			await service.updateBatch(batch);
			return Ok(new { message = "Batch Updated"});
		}
		
		[HttpPut("activate/{batchIsActive}/{batchId}")]
		public async Task<ActionResult> toggleBatch(bool batchIsActive, int batchId)
		{
			await service.activateBatch(batchIsActive, batchId);
			return Ok(new { message = "Batch Activation Toggled"});
		}

		[HttpDelete("delete/{id}")]
		public async Task<ActionResult> deleteById(int id) {
			await service.deleteBatch(id);
			return Ok(new { message = "Batch Deleted" });
		}
	}
}
