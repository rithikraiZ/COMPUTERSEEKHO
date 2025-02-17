using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Services
{
	public class GetInTouchService: IGetInTouchService
	{
		private readonly ComputerSeekhoDBContext context;
		public GetInTouchService(ComputerSeekhoDBContext context){ this.context = context; }

		public async Task addGetInTouch(GetInTouch getInTouch)
		{
			await context.GetInTouches.AddAsync(getInTouch);
			await context.SaveChangesAsync();
		}

		public async Task deleteGetInTouch(int getInTouchId)
		{
			var getInTouch = await context.GetInTouches.FindAsync(getInTouchId) ?? throw new NotFound($"No Get in touch with Id: {getInTouchId} exists.");
			context.GetInTouches.Remove(getInTouch);
			await context.SaveChangesAsync();
		}

		public async Task<IEnumerable<GetInTouch>> getAllGetInTouch()
		{
			var getInTouchList = await context.GetInTouches.ToListAsync();
			if(getInTouchList.Count == 0) throw new NotFound($"No online enquiries");
			return getInTouchList;
		}
	}
}
