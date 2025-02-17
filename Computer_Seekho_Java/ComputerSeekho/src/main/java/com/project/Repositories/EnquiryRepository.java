package com.project.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.Entities.Enquiry;
// import com.project.Entities.Staff;

import java.util.List;
import java.time.LocalDate;

@Repository
@Transactional
public interface EnquiryRepository extends JpaRepository<Enquiry, Integer> {
	List<Enquiry> findByEnquiryDate(LocalDate enquiryDate);

	@Query(value = """
			select * from Enquiry where Enquiry.staff_id = (select staff_id from Staff where staff_username = :staffUsername) AND Enquiry.enquiry_is_active = true ORDER BY follow_up_date DESC
			""", nativeQuery = true)
	List<Enquiry> getbystaff(String staffUsername);

	@Modifying
	@Query(value = """
			UPDATE Enquiry SET Enquiry.enquiry_is_active = false WHERE enquiry_id = ?1;
			""", nativeQuery = true)
	void deactivateEnquiry(int enquiryId);

	@Modifying
    @Query("UPDATE Enquiry e SET e.enquirerQuery = ?1, e.enquiryCounter = e.enquiryCounter + 1 WHERE e.enquiryId = ?2")
    int updateEnquirerQuery(String enquirerQuery, int enquiryId);

}
