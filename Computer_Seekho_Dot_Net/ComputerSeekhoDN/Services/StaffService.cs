using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ComputerSeekhoDN.Services
{
	public class StaffService : IStaffService
	{
		private readonly ComputerSeekhoDBContext csdbContext;
		public StaffService(ComputerSeekhoDBContext csdbcontext) {
			this.csdbContext = csdbcontext;
		}

		public async Task addStaff(Staff staff)
		{
			staff.StaffPassword = BCrypt.Net.BCrypt.HashPassword("rootpassword");
			staff.StaffRole = "ROLE_"+staff.StaffRole;
			await csdbContext.AddAsync(staff);
			await csdbContext.SaveChangesAsync();
		}

		public async Task deleteStaff(int staffId)
		{
			var staff = await csdbContext.Staff.FindAsync(staffId) ?? throw new NotFound($"Staff with Id: {staffId} does not exist");
			csdbContext.Staff.Remove(staff);
			await csdbContext.SaveChangesAsync();
		}

		public async Task<IEnumerable<Staff>> getAllStaffMembers()
		{
			var staffList =  await csdbContext.Staff.ToListAsync();
			if(staffList.Count == 0) throw new NotFound("No records");
			return staffList;
		}

		public async Task<IEnumerable<Staff>> getAllTeachingStaff()
		{
			return await csdbContext.Staff.Where(s => s.StaffRole == "ROLE_TEACHING").ToListAsync();
		}

		public async Task<Staff> getStaffById(int staffId)
		{
			var staff = await csdbContext.Staff.FindAsync(staffId);
			return staff ?? throw new NotFound($"No staff with Id: {staffId} exists.");
		}

		public async Task<Staff> getStaffByUsername(string staffUsername)
		{
			var staff = await csdbContext.Staff.FirstOrDefaultAsync(staff => staff.StaffUsername == staffUsername); return staff ?? throw new NotFound($"No staff with username: {staffUsername} exists.");
		}

		public async Task<int> getStaffIdByStaffUsername(string staffUsername)
		{
			var staff = await csdbContext.Staff.FirstOrDefaultAsync(staff => staff.StaffUsername == staffUsername) ?? throw new NotFound($"No staff with username: {staffUsername} exists.");
			return staff.StaffId;
		}

		public async Task updateStaff(Staff staff)
		{
			int staffId = staff.StaffId;
			staff.StaffPassword = BCrypt.Net.BCrypt.HashPassword(staff.StaffPassword);
			csdbContext.Entry(staff).State = EntityState.Modified;
			try
			{
				await csdbContext.SaveChangesAsync();
			}
			catch (DBConcurrencyException ex) {
				if (!staffExists(staffId))
				{
					throw new NotFound($"Staff with Id: {staffId} does not exist");
				}
				else {
					Console.WriteLine(ex.Message);
					throw;
				}
			}
		}

		//public Task<bool> updateStaffUserNamePassword(string staffUsername, string staffPassword, int staffId)
		//{
		//	throw new NotImplementedException();
		//}


		private bool staffExists(int id)
		{
			return csdbContext.Staff.Find(id) != null;
		}
	}
}
