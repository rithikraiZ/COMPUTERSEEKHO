using ComputerSeekhoDN.Models;
using Microsoft.AspNetCore.Mvc;

namespace ComputerSeekhoDN.Services
{
	public interface IEnquiryService
	{
		Task<Enquiry> getEnquiryById(int enquiryId);
		Task<IEnumerable<Enquiry>> getAllEnquiries();
		Task addEnquiry(Enquiry enquiry);
		Task updateEnquiry(Enquiry enquiry);
		Task deleteEnquiry(int enquiryId);
		Task<IEnumerable<Enquiry>> getbystaff(String staffUsername);
		Task updateEnquirerQuery(String enquirerQuery, int enquiryId);
		Task deactivateEnquiry(String closureReasonDesc, int enquiryId);
	}
}
