using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/staff")]
	[ApiController]
	public class StaffController : ControllerBase
	{
		private readonly IStaffService _staffService;

		public StaffController(IStaffService staffService)
		{
			_staffService = staffService;
		}

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Staff>>> GetAllStaffMembers()
		{
			return Ok(await _staffService.getAllStaffMembers());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Staff>> GetStaffById(int id)
		{
			return Ok(await _staffService.getStaffById(id));
		}
		
		[HttpGet("allTeaching")]
		public async Task<ActionResult<Staff>> GetAllTeachingStaff()
		{
			return Ok(await _staffService.getAllTeachingStaff());
		}

		[HttpPost("add")]
		public async Task<ActionResult> AddStaff([FromBody] Staff staff)
		{
			if (staff == null)
			{
				return BadRequest(new { message = "Invalid staff data" });
			}
			await _staffService.addStaff(staff);
			return Ok( new { message = "Staff added"});
		}

		[HttpPut("update")]
		public async Task<IActionResult> UpdateStaff([FromBody] Staff staff)
		{
			await _staffService.updateStaff(staff);
			return Ok(new {message = "Staff Updated"});
		}

		[HttpDelete("delete/{id}")]
		public async Task<IActionResult> DeleteStaff(int id)
		{
			await _staffService.deleteStaff(id);
			return Ok(new { message = "Staff deleted"});
		}


		[HttpGet("getIdByName/{username}")]
		public async Task<ActionResult<int>> GetStaffIdByUsername(string username)
		{
				int staffId = await _staffService.getStaffIdByStaffUsername(username);
				return Ok(staffId);
		}

		[HttpGet("getByUsername/{username}")]
		public async Task<ActionResult<Staff>> getStaffByUsername(string username)
		{
			return Ok(await _staffService.getStaffByUsername(username));
		}
	}
}
