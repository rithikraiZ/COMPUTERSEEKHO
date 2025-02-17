using ComputerSeekhoDN.Models;

namespace ComputerSeekhoDN.Services
{
	public interface IRecruiterService
	{
		Task addRecruiter(Recruiter recruiter);
		Task updateRecruiter(Recruiter recruiter);
		Task deleteRecruiter(int recruiterId);
		Task<Recruiter> getRecruiterById(int recruiterId);
		Task<IEnumerable<Recruiter>> getAllRecruiters();
	}
}
