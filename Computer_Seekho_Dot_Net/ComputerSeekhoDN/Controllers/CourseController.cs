using Computer_Seekho_DN.Service;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Controllers
{
	[Route("api/course")]
	[ApiController]
	public class CourseController : Controller
	{
		private readonly ICourseService _courseService;

		public CourseController(ICourseService courseService)
		{
			_courseService = courseService;
		}

		// GET: api/Course/all
		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Course>>> GetAllCourses()
		{
			return Ok(await _courseService.GetAllCourses());
		}

		// GET: api/Course/getById/{id}
		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Course>> GetCourseById(int id)
		{
			return Ok(await _courseService.GetCourseById(id));
		}

		// POST: api/Course/add
		[HttpPost("add")]
		public async Task<ActionResult> AddCourse([FromBody] Course course)
		{
			if (course == null)
			{
				return BadRequest(new { message = "Invalid Course data" });
			}
			await _courseService.AddCourse(course);
			return Ok(new { message = "Course Added Successfully" });
		}

		// PUT: api/Course/update
		[HttpPut("update")]
		public async Task<ActionResult<Course>> UpdateCourse([FromBody] Course course)
		{
			if (course == null)
			{
				return BadRequest(new { message = "Invalid Course data" });
			}
			await _courseService.UpdateCourse(course);
			return Ok(new { message = "Course updated."});
		}

		// DELETE: api/Course/delete/{id}
		[HttpDelete("delete/{id}")]
		public async Task<ActionResult> DeleteCourse(int id)
		{
			await _courseService.DeleteCourse(id);
			return Ok(new { message = "Course deleted"});
		}
	}
}