package com.project.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.Entities.Batch;
import com.project.Repositories.BatchRepository;

@Service
public class BatchServiceImpl implements BatchService {

	@Autowired
	private BatchRepository batchRepository;
	
	@Override
	public Optional<Batch> getBatchById(int batchId) {
		return batchRepository.findById(batchId);
	}

	@Override
	public List<Batch> getAllBatches() {
		return batchRepository.findAll();
	}

	@Override
	public Batch addBatch(Batch batch) {
		return batchRepository.save(batch);
	}

	@Override
	public boolean updateBatch(Batch batch) {
		Optional<Batch> foundBatch = batchRepository.findById(batch.getBatchId());
		if(foundBatch.isPresent()) {
			batchRepository.save(batch);
			return true;
		}
		else return false;
	}

	@Override
	public void deleteBatch(int batchId) {
		batchRepository.deleteById(batchId);
	}

	@Override
	public Optional<Batch> findByBatchName(String batchName) {
		return batchRepository.findByBatchName(batchName);
	}

	@Override
	public void activateBatch(Boolean batchIsActive, int batchId) {
		batchRepository.activateBatch(batchIsActive, batchId);
	}

}
