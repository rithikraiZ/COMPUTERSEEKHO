using ComputerSeekhoDN.DTO;
using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using ComputerSeekhoDN.Services;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using static System.Runtime.InteropServices.JavaScript.JSType;

public class PaymentService : IPaymentService
{
	private readonly ComputerSeekhoDBContext context;
	private readonly IStudentService studentService;
	private readonly IHttpClientFactory httpClientFactory;

	public PaymentService(ComputerSeekhoDBContext dbContext, IStudentService studentService, IHttpClientFactory httpClientFactory)
	{
		context = dbContext;
		this.studentService = studentService;
		this.httpClientFactory = httpClientFactory;
	}

	public async Task AddPayment(Payment payment)
	{
		if (payment == null) throw new NotFound("Invalid Payment Details");

		var student = await studentService.GetStudentById(payment.StudentId) ?? throw new NotFound("No Such Student For current payment");

		if (student.PaymentDue - payment.Amount < 0) throw new InvalidOperationException("Invalid Payment Amount");

		student.PaymentDue -= payment.Amount;
		await studentService.UpdateStudent(student);
		await context.Payments.AddAsync(payment);
		await context.SaveChangesAsync();

		var pt = await context.PaymentTypes.FindAsync(payment.PaymentTypeId) ?? throw new NotFound("Payment Method Invalid");
		await SendPaymentEmail(student, payment, pt.PaymentTypeDesc);

	}

	public async Task<IEnumerable<Payment>> GetAllPayments()
	{
		var paymentList = await context.Payments
			.Include(s => s.Student)
			.Include(p => p.PaymentType)
			.Include(r => r.Receipt)
			.ToListAsync();
		if (paymentList.Count == 0) throw new NotFound("No payment Records");
		return paymentList;
	}

	public async Task<Payment> GetPaymentById(int paymentId)
	{
		var payment = await context.Payments
			.Include(s => s.Student)
			.Include(p => p.PaymentType)
			.Include(r => r.Receipt)
			.FirstOrDefaultAsync(p => p.PaymentId == paymentId);
		return payment ?? throw new NotFound($"Payment Not found for Id: {paymentId}");
	}

	private async Task SendPaymentEmail(Student student,Payment payment,string paymentType)
	{
		var emailData = new
		{
			email = student.StudentEmail.ToString(),
			studentName = student.StudentName.ToString(),
			amount = payment.Amount.ToString(),
			Type = paymentType.ToString(),
			date = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss"),
			paymentId = payment.PaymentId.ToString()
		};

		try
		{
			var httpClient = httpClientFactory.CreateClient();
			var jsonContent = JsonSerializer.Serialize(emailData);
			Console.WriteLine(jsonContent);
			var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

			var response = await httpClient.PostAsync("http://localhost:8090/api/email/emailpayment", content);

			if (!response.IsSuccessStatusCode)
			{
				Console.WriteLine($"Problem sending the payment email. Status Code: {response.StatusCode}");
				Console.WriteLine(await response.Content.ReadAsStringAsync());
			}
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Exception occurred while sending payment email: {ex.Message}");
		}
	}
}