package com.project.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseDTO {
    private int studentId;
    private String photoUrl;
    private String studentName;
    private String studentEmail;
    private String studentMobile;
    private String courseName;
    private String batchName;
    private double paymentDue;
}
