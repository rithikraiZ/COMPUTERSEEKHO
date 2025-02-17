package com.project.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PlacementDTO {
    private int batchId;
    private String batchName;
    private String studentName;
    private String photoUrl;
    private String recruiterName;
}