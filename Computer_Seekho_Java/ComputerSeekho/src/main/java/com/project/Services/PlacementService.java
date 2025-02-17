package com.project.Services;


import com.project.Entities.Placement;
import java.util.List;
import java.util.Optional;

public interface PlacementService {
    Placement addPlacement(Placement placement);
    Optional<Placement> getPlacementById(int placementId);
    List<Placement> getAllPlacements();

    List<Placement> getPlacementsByBatchId(int batchId);
}
