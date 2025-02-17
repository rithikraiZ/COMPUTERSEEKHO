namespace ComputerSeekhoDN.DTO
{
	public class StudentResponseDTO
	{
		public int StudentId { get; set; }
		public string PhotoUrl { get; set; }
		public string StudentName { get; set; }
		public string StudentEmail { get; set; }
		public string StudentMobile { get; set; }
		public string CourseName { get; set; }
		public string BatchName { get; set; }
		public double PaymentDue { get; set; }

		public StudentResponseDTO() { }

		public StudentResponseDTO(int studentId, string photoUrl, string studentName, string studentEmail, string studentMobile, string courseName, string batchName, double paymentDue)
		{
			StudentId = studentId;
			PhotoUrl = photoUrl;
			StudentName = studentName;
			StudentEmail = studentEmail;
			StudentMobile = studentMobile;
			CourseName = courseName;
			BatchName = batchName;
			PaymentDue = paymentDue;
		}
	}
}