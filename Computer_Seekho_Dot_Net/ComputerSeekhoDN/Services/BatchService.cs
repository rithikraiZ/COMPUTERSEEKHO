using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Services
{
	public class BatchService : IBatchService
	{
		private readonly ComputerSeekhoDBContext context;
		public BatchService(ComputerSeekhoDBContext context) { this.context = context; }

		public async Task activateBatch(bool batchIsActive, int batchId)
		{
			var batch = await context.Batches.FindAsync(batchId) ?? throw new NotFound($"No Batch with Id: {batchId} exists.");
			batch.BatchIsActive = batchIsActive;
			context.Batches.Entry(batch).State = EntityState.Modified;
			await context.SaveChangesAsync();
		}

		public async Task addBatch(Batch batch)
		{
			await context.Batches.AddAsync(batch);
			await context.SaveChangesAsync();
		}

		public async Task deleteBatch(int batchId)
		{
			var batch = await context.Batches.FindAsync(batchId) ?? throw new NotFound($"No batch with Id: {batchId} exists.");
			context.Batches.Remove(batch);
			await context.SaveChangesAsync();
		}

		public async Task<Batch> findByBatchName(string batchName)
		{
			var batch = await context.Batches.FirstOrDefaultAsync(b => b.BatchName == batchName);
			return batch ?? throw new NotFound($"No Batch with name: {batchName} exists.");
		}

		public async Task<IEnumerable<Batch>> getAllBatches()
		{
			var batchList = await context.Batches.ToListAsync();
			if(batchList.Count == 0) throw new NotFound($"No batches.");
			return batchList;
		}

		public async Task<Batch> getBatchById(int batchId)
		{
			var batch = await context.Batches.FindAsync(batchId);
			return batch ?? throw new NotFound($"No Batch with Id: {batchId} exists.");
		}

		public async Task updateBatch(Batch batch)
		{
			int batchId = batch.BatchId;
			context.Batches.Entry(batch).State = EntityState.Modified;
			try
			{
				await context.SaveChangesAsync();
			}
			catch (Exception ex) {
				if (!batchExists(batchId)) throw new NotFound($"No batch with Id: {batchId} exists.");
				else {
					Console.WriteLine(ex.Message);
					throw;
				}
			}
		}

		private bool batchExists(int id)
		{
			return context.Batches.Find(id) != null;
		}
	}
}
