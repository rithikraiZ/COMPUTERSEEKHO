using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/paymentType")]
	[ApiController]
	public class PaymentTypeController : ControllerBase
	{
		private readonly IPaymentTypeService service;
		public PaymentTypeController(IPaymentTypeService service) { this.service = service; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<PaymentType>>> getAll() {
			return Ok(await service.getAllPaymentTypes());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<PaymentType>> getById(int id)
		{
			return Ok(await service.getPaymentTypeById(id));
		}

		[HttpPost("add")]
		public async Task<ActionResult> addPaymentType([FromBody] PaymentType type)
		{
			if (type == null) return BadRequest(new { message = "Invalid Details"});
			await service.addPaymentType(type);
			return Ok(new { message = "Payment Type Added" });
		}
	}
}
