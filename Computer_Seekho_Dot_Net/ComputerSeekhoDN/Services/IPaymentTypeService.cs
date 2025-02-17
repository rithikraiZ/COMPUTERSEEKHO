using ComputerSeekhoDN.Models;

namespace ComputerSeekhoDN.Services
{
	public interface IPaymentTypeService
	{
		Task<IEnumerable<PaymentType>> getAllPaymentTypes();
		Task<PaymentType> getPaymentTypeById(int id);
		Task addPaymentType(PaymentType payment);
	}
}
