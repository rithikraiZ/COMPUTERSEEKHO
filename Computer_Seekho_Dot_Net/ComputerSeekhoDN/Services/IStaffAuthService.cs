using ComputerSeekhoDN.Models;

namespace ComputerSeekhoDN.Services
{
	public interface IStaffAuthService
	{
		Task<string> Authenticate(string username, string password);
		string generateJwtToken(Staff staff);
	}
}
