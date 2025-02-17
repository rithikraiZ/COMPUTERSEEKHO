using ComputerSeekhoDN.Models;
using Microsoft.AspNetCore.Mvc;

namespace Computer_Seekho_DN.Service;

public interface ICourseService
{
	Task<Course> GetCourseById(int courseId);
	Task<IEnumerable<Course>> GetAllCourses();
	Task AddCourse(Course course);
	Task UpdateCourse(Course course);
	Task DeleteCourse(int courseId);
	Task<Course> FindCourseByName(string courseName);
}