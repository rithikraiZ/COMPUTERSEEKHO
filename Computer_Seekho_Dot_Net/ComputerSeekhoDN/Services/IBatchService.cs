using ComputerSeekhoDN.Models;

namespace ComputerSeekhoDN.Services
{
	public interface IBatchService
	{
		Task<Batch> getBatchById(int batchId);
		Task<IEnumerable<Batch>> getAllBatches();
		Task addBatch(Batch batch);
		Task deleteBatch(int batchId);
		Task updateBatch(Batch batch);
		Task<Batch> findByBatchName(String batchName);
		Task activateBatch(Boolean batchIsActive, int batchId);
	}
}
