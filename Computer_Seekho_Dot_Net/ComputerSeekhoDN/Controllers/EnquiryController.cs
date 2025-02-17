using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/enquiry")]
	[ApiController]
	public class EnquiryController : ControllerBase
	{
		private readonly IEnquiryService enquiryService;
		public EnquiryController(IEnquiryService enquiryService)
		{
			this.enquiryService = enquiryService;
		}

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Enquiry>>> GetAll() {
			return Ok(await enquiryService.getAllEnquiries());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Enquiry>> getById(int id)
		{
			return Ok(await enquiryService.getEnquiryById(id));
		}

		[HttpPost("add")]
		public async Task<ActionResult> addEnquiry([FromBody] Enquiry enquiry)
		{
			if (enquiry == null) return BadRequest(new { message = "Invalid enquiry data" });
			await enquiryService.addEnquiry(enquiry);
			return Ok(new { message = "Enquiry Added"});
		}

		[HttpPut("update")]
		public async Task<ActionResult> updateEnquiry([FromBody] Enquiry enquiry)
		{
			if(enquiry == null) return BadRequest(new { message = "Invalid enquiry data"});
			await enquiryService.updateEnquiry(enquiry);
			return Ok(new { message = "Enquiry Updated"});
		}

		[HttpDelete("delete/{enquiryId}")]
		public async Task<ActionResult> deleteEnquiry(int enquiryId)
		{
			await enquiryService.deleteEnquiry(enquiryId);
			return Ok(new { message = "Enquiry Deleted Successfully"});
		}

		[HttpGet("getByStaff/{staffUsername}")]
		public async Task<ActionResult<IEnumerable<Enquiry>>> getEnquiriesByStaff(string staffUsername)
		{
			return Ok(await enquiryService.getbystaff(staffUsername));
		}

		[HttpPut("updateEnquirerQuery/{enquiryId}")]
		public async Task<ActionResult> updateEnquirerQuery([FromBody] string enquiryMessage, int enquiryId)
		{
			await enquiryService.updateEnquirerQuery(enquiryMessage, enquiryId);
			return Ok(new { message = "Enquiry Message Updated"});
		}
		
		[HttpPut("deactivate/{enquiryId}")]
		public async Task<ActionResult> deactivateEnquiry([FromBody] string enquiryMessage, int enquiryId)
		{
			await enquiryService.deactivateEnquiry(enquiryMessage, enquiryId);
			return Ok(new { message = "Enquiry Message Updated"});
		}
	}
}
