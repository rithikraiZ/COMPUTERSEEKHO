using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Computer_Seekho_DN.Service;
using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class CourseService : ICourseService
{
	private readonly ComputerSeekhoDBContext _context;

	public CourseService(ComputerSeekhoDBContext context)
	{
		_context = context;
	}

	public async Task<Course> GetCourseById(int courseId)
	{
		var course = await _context.Courses.FindAsync(courseId);
		return course ?? throw new NotFound($"No course with id {courseId} exists");
	}

	public async Task<IEnumerable<Course>> GetAllCourses()
	{
		var courseList = await _context.Courses.ToListAsync();
		if(courseList.Count == 0) throw new NotFound("No records");
		return courseList;
	}

	public async Task AddCourse(Course course)
	{
		await _context.AddAsync(course);
		await _context.SaveChangesAsync();
	}

	public async Task UpdateCourse(Course course)
	{
		int courseId = course.CourseId;
		_context.Entry(course).State = EntityState.Modified;
		try
		{
			await _context.SaveChangesAsync();
		}
		catch (DBConcurrencyException ex)
		{
			if (!courseExists(courseId)) throw new NotFound($"Staff with Id: {courseId} does not exist");
			else
			{
				Console.WriteLine(ex.Message);
				throw;
			}
		}
	}

	public async Task DeleteCourse(int courseId)
	{
		var course = await _context.Courses.FindAsync(courseId) ?? throw new NotFound($"No course with Id: {courseId} exists.");
		_context.Courses.Remove(course);
		await _context.SaveChangesAsync();
	}

	public async Task<Course> FindCourseByName(string courseName)
	{
		var course =  await _context.Courses.FirstOrDefaultAsync(c => c.CourseName == courseName);
		return course ?? throw new NotFound("No course with this name exists");
	}

	private bool courseExists(int courseId)
	{
		return _context.Courses.Find(courseId) != null;
	}
}