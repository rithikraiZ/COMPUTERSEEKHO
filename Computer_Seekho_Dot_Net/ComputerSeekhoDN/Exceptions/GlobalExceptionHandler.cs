using Microsoft.AspNetCore.Diagnostics;

namespace ComputerSeekhoDN.Exceptions
{
	public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
	{
		public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
		{
			logger.LogError(exception, exception.Message);
			switch (exception)
			{
				case NotFound:
					httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
					break;
				case UnauthorizedException:
					httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
					break;
				case InvalidOperationException:
					httpContext.Response.StatusCode = StatusCodes.Status406NotAcceptable;
					break;
				default:
					httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
					break;
			}

			var response = new ExceptionRespone {StatusCode = httpContext.Response.StatusCode, Message = exception.Message };

			await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);
			return true;
		}
	}
}
