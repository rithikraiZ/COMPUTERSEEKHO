using System.Collections.Generic;
using System.Threading.Tasks;
using ComputerSeekhoDN.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekho.Services
{
	public interface IClosureReasonService
	{
		Task<IEnumerable<ClosureReason>> GetAllClosureReasons();
		Task<ClosureReason> GetById(int id);
		Task Add(ClosureReason closureReason);
		Task Update(ClosureReason closureReason);
		Task Delete(int id);
	}
}