using ComputerSeekhoDN.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace ComputerSeekhoDN.Controllers
{
	[Route("auth")]
	[ApiController]
	public class StaffAuthController : ControllerBase
	{
		private readonly IStaffAuthService service;
		public StaffAuthController(IStaffAuthService service) { this.service = service; }

		[HttpPost("signIn")]
		public async Task<ActionResult> signIn()
		{
			if (Request.Headers.TryGetValue("Authorization", out var authenticationHeader))
			{
				if (authenticationHeader.ToString().StartsWith("Basic", StringComparison.OrdinalIgnoreCase))
				{
					string encodedCredentials = authenticationHeader.ToString().Substring("Basic".Length).Trim();
					byte[] byteCredentials = Convert.FromBase64String(encodedCredentials);
					string decodedCredentials = Encoding.UTF8.GetString(byteCredentials);

					var credentials = decodedCredentials.Split(':');
					if (credentials.Length == 2)
					{
						string username = credentials[0];
						string password = credentials[1];

						string token = await service.Authenticate(username, password);

						if (string.IsNullOrEmpty(token)) return Unauthorized("Invalid credentials");

						Response.Headers.Add("Authorization", $"Bearer {token}");
						return Ok("Login Successfull");
					}
				}
				return Unauthorized("Authorization Header is not valid");
			}
			return BadRequest("Authorization Header Not Found");
		}
	}
}
