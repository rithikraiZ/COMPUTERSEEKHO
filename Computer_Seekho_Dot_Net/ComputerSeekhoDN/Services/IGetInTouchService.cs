using ComputerSeekhoDN.Models;

namespace ComputerSeekhoDN.Services
{
	public interface IGetInTouchService
	{
		Task<IEnumerable<GetInTouch>> getAllGetInTouch();
		Task addGetInTouch(GetInTouch getInTouch);
		Task deleteGetInTouch(int getInTouchId);
	}
}
