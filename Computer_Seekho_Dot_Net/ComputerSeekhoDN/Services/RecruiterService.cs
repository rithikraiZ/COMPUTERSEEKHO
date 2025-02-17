using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace ComputerSeekhoDN.Services
{
	public class RecruiterService : IRecruiterService
	{
		private readonly ComputerSeekhoDBContext context;
		public RecruiterService(ComputerSeekhoDBContext context) { this.context = context; }

		public async Task addRecruiter(Recruiter recruiter)
		{
			await context.AddAsync(recruiter);
			await context.SaveChangesAsync();
		}

		public async Task deleteRecruiter(int recruiterId)
		{
			var recruiter = await context.Recruiters.FindAsync(recruiterId) ?? throw new NotFound($"No recruiter with Id: {recruiterId} exists.");
			context.Recruiters.Remove(recruiter);
			await context.SaveChangesAsync();
		}

		public async Task<IEnumerable<Recruiter>> getAllRecruiters()
		{
			var recruiterList = await context.Recruiters.ToListAsync();
			if (recruiterList.Count == 0) throw new NotFound($"No recruiters.");
			return recruiterList;
		}

		public async Task<Recruiter> getRecruiterById(int recruiterId)
		{
			var recruiter = await context.Recruiters.FindAsync(recruiterId);
			return recruiter ?? throw new NotFound($"No recruiter with Id: {recruiterId} exists.");
		}

		public async Task updateRecruiter(Recruiter recruiter)
		{
			int recruiterId = recruiter.RecruiterId;
			context.Recruiters.Entry(recruiter).State = EntityState.Modified;
			try
			{
				await context.SaveChangesAsync();
			}
			catch(DBConcurrencyException ex) {
				if(!recruiterExists(recruiterId)) throw new NotFound($"No recruiter with Id: {recruiterId} exists.");
				else
				{
					Console.WriteLine(ex.Message);
					throw;
				}
			}
		}

		private bool recruiterExists(int id)
		{
			return context.Recruiters.Find(id) != null;
		}
	}
}
