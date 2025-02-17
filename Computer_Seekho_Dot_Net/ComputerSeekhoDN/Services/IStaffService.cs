using ComputerSeekhoDN.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Services
{
	public interface IStaffService
	{
		Task<Staff> getStaffById(int staffId);
		Task<Staff> getStaffByUsername(String staffUsername);
		Task<IEnumerable<Staff>> getAllStaffMembers();
		Task addStaff(Staff staff);
		Task updateStaff(Staff staff);
		Task deleteStaff(int staffId);
		
		//Task<bool> updateStaffUserNamePassword(String staffUsername, String staffPassword, int staffId);
		Task<int> getStaffIdByStaffUsername(String staffUsername);
		Task<IEnumerable<Staff>> getAllTeachingStaff();
	}
}
