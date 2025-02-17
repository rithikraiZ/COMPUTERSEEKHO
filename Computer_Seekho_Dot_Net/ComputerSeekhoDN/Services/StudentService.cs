using ComputerSeekho.Services;
using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Security.AccessControl;
using System.Text.Json;
using System.Text;
using Computer_Seekho_DN.Service;

namespace ComputerSeekhoDN.Services
{
	public class StudentService : IStudentService
	{
		private readonly ComputerSeekhoDBContext context;
		private readonly IEnquiryService enquiryService;
		private readonly ICourseService courseService;

		public StudentService(ComputerSeekhoDBContext context, IEnquiryService enquiryService, ICourseService courseService)
		{
			this.context = context;
			this.enquiryService = enquiryService;
			this.courseService = courseService;
		}

		public async Task AddStudent(Student student, int enquiryId)
		{
			int courseId = student.CourseId;
			var course	= await courseService.GetCourseById(courseId);
			student.PaymentDue = course.CourseFee;
			context.Students.Add(student);
			await context.SaveChangesAsync();
			await enquiryService.deactivateEnquiry("Student Admitted to the institute", enquiryId);
			var emailData = new
			{
				to = student.StudentEmail,
				studentName = student.StudentName
			};

			try
			{
				using (var httpClient = new HttpClient())
				{
					var jsonContent = JsonSerializer.Serialize(emailData);
					var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

					var response = await httpClient.PostAsync("http://localhost:8090/api/email/send", content);

					if (!response.IsSuccessStatusCode)
					{
						Console.WriteLine("Problem sending the email");
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Exception occurred while sending email: {ex.Message}");
			}
		}


		public async Task DeleteStudent(int studentId)
		{
			var student = await context.Students.FindAsync(studentId) ?? throw new NotFound($"Student not found with Id: {studentId}");

			context.Students.Remove(student);
			await context.SaveChangesAsync();
		}

		public async Task<IEnumerable<Student>> GetAllStudents()
		{
			var studentList =  await context.Students.Include(s => s.Batch).Include(s => s.Course).ToListAsync();

			if (studentList.Count == 0) throw new NotFound("No student records");
			return studentList;
		}


		public async Task<Student> GetStudentById(int studentId)
		{
			var student = await context.Students.FindAsync(studentId);
			return student ?? throw new NotFound($"no student with Id: {studentId} exists");
		}

		public async Task UpdateStudent(Student student)
		{
			int studentId = student.StudentId;
			context.Students.Entry(student).State = EntityState.Modified;
			try{
				await context.SaveChangesAsync();
			}
			catch(DBConcurrencyException ex){
				if (!studentExists(studentId)) throw new NotFound($"no student with Id: {studentId} exists");
				else
				{
					Console.WriteLine(ex.Message);
					throw;
				}
			}
		}

		private bool studentExists(int id)
		{
			return context.Students.Find(id) != null;
		}
	}
}