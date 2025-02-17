using ComputerSeekho.Services;
using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ComputerSeekhoDN.Services
{
	public class ClosureReasonService : IClosureReasonService
	{
		private readonly ComputerSeekhoDBContext context;
		public ClosureReasonService(ComputerSeekhoDBContext context)
		{
			this.context = context;
		}

		public async Task Add(ClosureReason closureReason)
		{
			await context.AddAsync(closureReason);
			await context.SaveChangesAsync();
		}

		public async Task Delete(int id)
		{
			var closureReason = await context.ClosureReasons.FindAsync(id) ?? throw new NotFound($"No Closure Reason with Id: {id} exists.");
			context.ClosureReasons.Remove(closureReason);
			await context.SaveChangesAsync();
		}

		public async Task<IEnumerable<ClosureReason>> GetAllClosureReasons()
		{
			var reasonList = await context.ClosureReasons.ToListAsync();
			if(reasonList.Count ==  0) throw new NotFound("No records");
			return reasonList;
		}

		public async Task<ClosureReason> GetById(int id)
		{
			var closureReason = await context.ClosureReasons.FindAsync(id);
			return closureReason ?? throw new NotFound($"No Closure Reason with Id: {id} exists.");
		}

		public async Task Update(ClosureReason closureReason)
		{
			int reasonId = closureReason.ClosureReasonId;
			context.ClosureReasons.Entry(closureReason).State = EntityState.Modified;
			try
			{
				await context.SaveChangesAsync();
			}
			catch(DBConcurrencyException ex){
				if (!ClossureReasonExists(reasonId)) throw new NotFound($"No Closure Reason with Id: {reasonId} exists.");
				else{
					Console.WriteLine(ex.Message);
					throw;
				}
			}
		}

		private bool ClossureReasonExists(int closureReasonId){
			return context.ClosureReasons.Find(closureReasonId) != null;
		}
	}
}
