package com.project.Services;

import java.util.List;
import java.util.Optional;

import com.project.Entities.Batch;

public interface BatchService {
	Optional<Batch> getBatchById(int batchId);
	List<Batch> getAllBatches();
	Batch addBatch(Batch batch);
	void deleteBatch(int batchId);
	boolean updateBatch(Batch batch);
	Optional<Batch> findByBatchName(String batchName);
	void activateBatch(Boolean batchIsActive, int batchId);
}
