using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.EntityFrameworkCore;

namespace ComputerSeekhoDN.Services
{
	public class PaymentTypeService : IPaymentTypeService
	{
		private readonly ComputerSeekhoDBContext context;
		public PaymentTypeService(ComputerSeekhoDBContext context) { this.context = context; }

		public async Task addPaymentType(PaymentType payment)
		{
			await context.PaymentTypes.AddAsync(payment);
			await context.SaveChangesAsync();
		}

		public async Task<IEnumerable<PaymentType>> getAllPaymentTypes()
		{
			var paymentTypeList = await context.PaymentTypes.ToListAsync();
			if (paymentTypeList.Count == 0) throw new NotFound($"No records");
			return paymentTypeList;
		}

		public async Task<PaymentType> getPaymentTypeById(int id)
		{
			var paymentType = await context.PaymentTypes.FindAsync(id);
			return paymentType ?? throw new NotFound($"No payment type with Id: {id} exists.");
		}
	}
}
