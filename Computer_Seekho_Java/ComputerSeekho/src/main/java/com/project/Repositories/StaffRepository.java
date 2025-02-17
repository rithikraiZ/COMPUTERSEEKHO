package com.project.Repositories;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.Entities.Staff;


@Repository
@Transactional
public interface StaffRepository extends JpaRepository<Staff, Integer>{

	Optional<Staff> findByStaffUsername(String staffUsername);

	@Modifying
    @Query(value = "UPDATE Staff SET staff_username = :staffUsername ,staff_password = :staffPassword where staff_id = :staffId", nativeQuery = true)
    void updateStaffUserNamePassword(@Param("staffUsername") String staffUsername,@Param("staffPassword") String staffPassword, @Param("staffId") int staffId);

    @Modifying
    @Query(value = "DELETE FROM Staff WHERE staff_username = :staffUsername", nativeQuery = true)
    void deleteByStaffUsername(@Param("staffUsername") String staffUsername);

    @Query(value = """
    SELECT staff_id FROM staff WHERE staff_username =?1""", nativeQuery = true)
    public int getStaffIdByStaffUsername(String staffUsername);

    @Query(value = """
            SELECT * FROM STAFF WHERE staff_role = "ROLE_TEACHING"
            """, nativeQuery = true)
    public List<Staff> getAllTeachingStaff();
}
