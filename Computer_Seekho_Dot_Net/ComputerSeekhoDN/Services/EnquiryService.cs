using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Data;

namespace ComputerSeekhoDN.Services
{
	public class EnquiryService : IEnquiryService
	{
		private readonly ComputerSeekhoDBContext csdbContext;

		public EnquiryService(ComputerSeekhoDBContext csdbContext)
		{
			this.csdbContext = csdbContext;
		}

		public async Task addEnquiry(Enquiry enquiry)
		{
			await csdbContext.AddAsync(enquiry);
			await csdbContext.SaveChangesAsync();
		}

		public async Task deactivateEnquiry(string closureReasonDesc, int enquiryId)
		{
			var enquiry = csdbContext.Enquiries.Find(enquiryId) ?? throw new NotFound($"Enquiry with Id: {enquiryId} does not exists");

			enquiry.EnquiryIsActive = false;
			await csdbContext.ClosureReasons.AddAsync(new ClosureReason { ClosureReasonDesc = closureReasonDesc, EnquirerName = enquiry.StudentName??enquiry.EnquirerName});

			csdbContext.Entry(enquiry).State = EntityState.Modified;
			await csdbContext.SaveChangesAsync();
		}

		public async Task deleteEnquiry(int enquiryId)
		{
			var enquiry = await csdbContext.Enquiries.FindAsync(enquiryId) ?? throw new NotFound($"Enquiry not found with id: {enquiryId}");
			csdbContext.Enquiries.Remove(enquiry);
			await csdbContext.SaveChangesAsync();
		}

		public async Task<IEnumerable<Enquiry>> getAllEnquiries()
		{
			var enquiryList = await csdbContext.Enquiries.ToListAsync();
			if (enquiryList.Count == 0) throw new NotFound("No records");
			return enquiryList;
		}

		public async Task<IEnumerable<Enquiry>> getbystaff(string staffUsername)
		{
			var staff = await csdbContext.Staff.FirstOrDefaultAsync(staff => staff.StaffUsername == staffUsername) ?? throw new NotFound($"No staff with username: {staffUsername} exists.");
			int staffId = staff.StaffId;
			var enquiryList = await csdbContext.Enquiries.Where(e => e.StaffId == staffId && e.EnquiryIsActive == true).OrderByDescending(e  => e.FollowUpDate).ToListAsync();
			if (enquiryList.Count == 0) throw new NotFound($"Enquiries for staff with username: {staffUsername} do not exist");
			return enquiryList;
		}

		public async Task<Enquiry> getEnquiryById(int enquiryId)
		{
			var foundEnquiry = await csdbContext.Enquiries.FindAsync(enquiryId);
			return foundEnquiry ?? throw new NotFound($"Enquiry Not Found with Id: {enquiryId}");
		}

		public async Task updateEnquirerQuery(string enquirerQuery, int enquiryId)
		{
			var enquiry = await csdbContext.Enquiries.FindAsync(enquiryId) ?? throw new NotFound($"No enquiry with Id: {enquiryId} exists");
			enquiry.EnquirerQuery = enquirerQuery;
			enquiry.EnquiryCounter++;
			csdbContext.Entry(enquiry).State = EntityState.Modified;
			await csdbContext.SaveChangesAsync();
		}

		public async Task updateEnquiry(Enquiry enquiry)
		{
			int enquiryId = enquiry.EnquiryId;
			csdbContext.Entry(enquiry).State = EntityState.Modified;
			try
			{
				await csdbContext.SaveChangesAsync();
			}
			catch (DBConcurrencyException ex)
			{
				if (!enquiryExists(enquiryId))
				{
					throw new NotFound($"Enquiry with Id: {enquiryId} does not exists");
				}
				else
				{
					Console.WriteLine(ex.Message);
					throw;
				}
			}
		}

		private bool enquiryExists(int id)
		{
			return csdbContext.Enquiries.Find(id) != null;
		}
	}
}
