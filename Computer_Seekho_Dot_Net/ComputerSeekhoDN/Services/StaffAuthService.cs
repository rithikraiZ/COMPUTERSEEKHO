using BCrypt.Net;
using ComputerSeekhoDN.Exceptions;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ComputerSeekhoDN.Services
{
	public class StaffAuthService : IStaffAuthService
	{
		private readonly IConfiguration configuration;
		private readonly ComputerSeekhoDBContext context;

		public StaffAuthService(IConfiguration configuration, ComputerSeekhoDBContext context) {
			this.context = context;
			this.configuration = configuration;
		}

		public async Task<string> Authenticate(string username, string password)
		{
			var staff = await context.Staff.FirstOrDefaultAsync(s => s.StaffUsername == username) ??
				throw new NotFound($"No staff with username: {username}");
			string passwordHash = staff.StaffPassword;

			if (!BCrypt.Net.BCrypt.Verify(password, passwordHash)) throw new UnauthorizedException("Wrong Password");
			return generateJwtToken(staff);
		}

		public string generateJwtToken(Staff staff)
		{
			var claims = new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.Sub,configuration["Jwt:Subject"]??"staff-auth"),
				new Claim("username",staff.StaffUsername),
				new Claim("Role",staff.StaffRole),
				new Claim(JwtRegisteredClaimNames.Iat,DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString())
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt Key not found")));

			var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var jwttoken = new JwtSecurityToken(
				issuer: configuration["Jwt:Issuer"],
				audience: configuration["Jwt:Audience"],
				claims: claims,
				expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(configuration["Jwt:Expiry"] ?? "60")),
				signingCredentials: credentials
			);

			Console.WriteLine(jwttoken.ToString());
			return new JwtSecurityTokenHandler().WriteToken(jwttoken);
		}
	}
}
