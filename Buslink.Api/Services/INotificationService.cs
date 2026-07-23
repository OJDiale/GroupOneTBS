namespace Buslink.Api.Services;

public interface INotificationService
{
    Task SendOtpEmailAsync(string email, string recipientName, string otp, CancellationToken ct = default);
}
