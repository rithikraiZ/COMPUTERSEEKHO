using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
namespace ComputerSeekhoDN.Controllers
{
	[Route("api/student")]
	[ApiController]
	public class StudentController : Controller
	{
		private readonly IStudentService service;
		public StudentController(IStudentService studentService){ this.service = studentService; }

		[HttpGet("all")]
		public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
		{
			return Ok(await service.GetAllStudents());
		}

		[HttpGet("getById/{id}")]
		public async Task<ActionResult<Student>> GetStudentById(int id)
		{
			return (await service.GetStudentById(id));
		}

		[HttpDelete("delete/{id}")]
		public async Task<ActionResult> DeleteStudent(int id)
		{
			await service.DeleteStudent(id);
			return Ok(new {message = "Student Deleted Successfully"});
		}

		[HttpPost("add/{enquiryId}")]
		public async Task<ActionResult> AddStudent([FromBody] Student student, int enquiryId)
		{
			if (student == null) return BadRequest(new { message = "Invalid Student data" });
			await service.AddStudent(student, enquiryId);
			return Ok("Student Added Successfully");
		}

		[HttpPut("update")]
		public async Task<ActionResult> UpdateStudent([FromBody] Student student)
		{
			if (student == null) return BadRequest(new { message = "Invalid Student details" });
			await service.UpdateStudent(student);
			return Ok(new { message = "Student Updated" });
		}
	}
}