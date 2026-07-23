namespace Buslink.Api.Services;

public class NotificationService : INotificationService
{
    private readonly EmailService _emailService;

    public NotificationService(EmailService emailService) => _emailService = emailService;

    public Task SendOtpEmailAsync(string email, string recipientName, string otp, CancellationToken ct = default)
    {
        return _emailService.SendOtpEmailAsync(email, recipientName, otp, ct);
    }
}
