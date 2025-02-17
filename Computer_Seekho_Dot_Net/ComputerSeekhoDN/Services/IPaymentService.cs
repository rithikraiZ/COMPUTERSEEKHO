using ComputerSeekhoDN.DTO;
using ComputerSeekhoDN.Models;

namespace ComputerSeekhoDN.Services
{
	public interface IPaymentService
	{
		Task<Payment> GetPaymentById(int paymentId);

		Task<IEnumerable<Payment>> GetAllPayments();

		Task AddPayment(Payment payment);
	}
}