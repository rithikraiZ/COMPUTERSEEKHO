using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/payment")]
	[ApiController]
	public class PaymentController : Controller
	{
		private readonly IPaymentService _paymentService;

		public PaymentController(IPaymentService paymentService) { _paymentService = paymentService; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Payment>>> GetAllPayments()
		{
			return Ok(await _paymentService.GetAllPayments());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Payment>> GetPaymentById(int id)
		{
			return Ok(await _paymentService.GetPaymentById(id));
		}

		[HttpPost("add")]
		public async Task<ActionResult<Payment>> AddPayment([FromBody] Payment payment)
		{
			await _paymentService.AddPayment(payment);
			return Ok(new { message = "Payment Added" });
		}
	}
}