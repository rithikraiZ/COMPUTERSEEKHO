package com.project.Services;

import java.util.*;

import com.project.Entities.Staff;

public interface StaffService {
	Optional<Staff> getStaffById(int staffId);
	Optional<Staff> getStaffByUsername(String staffUsername);
	List<Staff> getAllStaffMembers();
	Staff addStaff(Staff staff);
	boolean updateStaff(Staff staff);
	void deleteStaff(int staffId);
	boolean updateStaffUserNamePassword(String staffUsername, String staffPassword, int staffId);
	void deleteByStaffUsername(String staffUsername);
	int getStaffIdByStaffUsername(String staffUsername);
	List<Staff> getAllTeachingStaff();
}
