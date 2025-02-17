package com.project.Services;

import java.util.List;
import java.util.Optional;

import com.project.Entities.ClosureReason;

public interface ClosureReasonService {
	Optional<ClosureReason> getClosureReasonById(int closureReasonId);
	List<ClosureReason> getAllClosureReasons();
	ClosureReason addClosureReason(ClosureReason closureReason);
	boolean updateClosureReason(ClosureReason closureReason);
	void deleteClosureReason(int closureReasonId);	
}
