using ComputerSeekhoDN.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Services
{
	public interface IStudentService
	{
		Task<Student> GetStudentById(int studentId);

		Task<IEnumerable<Student>> GetAllStudents();

		Task AddStudent(Student student, int enquiryId);

		Task UpdateStudent(Student student);

		Task DeleteStudent(int studentId);
	}
}