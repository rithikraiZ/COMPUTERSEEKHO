using Microsoft.EntityFrameworkCore;
using ComputerSeekhoDN.Models;
using ComputerSeekhoDN.Services;
using ComputerSeekhoDN.Repositories;
using ComputerSeekhoDN.Exceptions;
using Computer_Seekho_DN.Service;
using ComputerSeekho.Services;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

//Add CORS Config
builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowFrontEnd&MicroServices",
		policy =>
		{
			policy.WithOrigins("*")
				  .AllowAnyMethod()
				  .AllowAnyHeader()
				  .WithExposedHeaders("Authorization");
		});
});

// Configure MySQL Database Connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ComputerSeekhoDBContext>(options =>
	options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Register your service dependencies
builder.Services.AddScoped<IAlbumService, AlbumService>();
builder.Services.AddScoped<IBatchService, BatchService>();
builder.Services.AddScoped<IClosureReasonService, ClosureReasonService>();
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IEnquiryService, EnquiryService>();
builder.Services.AddScoped<IGetInTouchService, GetInTouchService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IPaymentTypeService, PaymentTypeService>();
builder.Services.AddScoped<IStaffService, StaffService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IRecruiterService, RecruiterService>();
builder.Services.AddScoped<IVideoService, VideoService>();
builder.Services.AddHttpClient();

//Config for JWT token
builder.Services.AddScoped<IStaffAuthService, StaffAuthService>();
var jwtCongif = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwtCongif["Key"]!);

builder.Services.AddAuthentication(options => {
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => { 
	options.RequireHttpsMetadata = false;
	options.SaveToken = true;
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(key),
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidIssuer = jwtCongif["Issuer"],
		ValidAudience = jwtCongif["Audience"],
		ValidateLifetime = true,
		ClockSkew = TimeSpan.Zero
	};
});

builder.Services.AddAuthorization();


// Enable Swagger for API documentation (optional)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Global Exception Handling
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();

var app = builder.Build();

 //Enable middleware for error handling during development
if (app.Environment.IsDevelopment())
{
	app.UseDeveloperExceptionPage();
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors("AllowFrontEnd&MicroServices");
app.UseExceptionHandler( _ => { });
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();