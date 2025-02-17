package com.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.Entities.Staff;
import com.project.Repositories.StaffRepository;
@Service
public class StaffServiceImpl implements StaffService {
	
	@Autowired
	private StaffRepository staffRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public Optional<Staff> getStaffById(int staffId) {
		return staffRepository.findById(staffId);
	}

	@Override
	public Optional<Staff> getStaffByUsername(String staffUsername) {
		return staffRepository.findByStaffUsername(staffUsername);
	}

	@Override
	public List<Staff> getAllStaffMembers() {
		return staffRepository.findAll();
	}

	@Override
	public Staff addStaff(Staff staff) {
		staff.setStaffRole("ROLE_"+staff.getStaffRole());
		staff.setStaffUsername(staff.getStaffEmail());
		staff.setStaffPassword(passwordEncoder.encode("rootpassword"));
		return staffRepository.save(staff);
	}
	
	@Override
	public boolean updateStaff(Staff staff) {
		staff.setStaffRole("ROLE_"+staff.getStaffRole());
		String password = passwordEncoder.encode(staff.getStaffPassword());
		staff.setStaffPassword(password);
		Optional<Staff> foundStaff = staffRepository.findById(staff.getStaffId());
		if(foundStaff.isPresent()) {
			staffRepository.save(staff);
			return true;
		}
		else return false;
	}
	
	@Override
	public void deleteStaff(int staffId) {
		staffRepository.deleteById(staffId);
	}
	
	@Override
	public boolean updateStaffUserNamePassword(String staffUsername, String staffPassword, int staffId) {
		Optional<Staff> foundStaff = staffRepository.findById(staffId);
		if(foundStaff.isPresent()) {
			String password = passwordEncoder.encode(staffPassword);
			staffRepository.updateStaffUserNamePassword(staffUsername, password, staffId);
			return true;
		}
		else return false;
	}

	@Override
	public void deleteByStaffUsername(String staffUsername) {
		staffRepository.deleteByStaffUsername(staffUsername);
	}

	@Override
	public int getStaffIdByStaffUsername(String staffUsername) {
		return staffRepository.getStaffIdByStaffUsername(staffUsername);
	}

	@Override
	public List<Staff> getAllTeachingStaff() {
		return staffRepository.getAllTeachingStaff();
	}
}
