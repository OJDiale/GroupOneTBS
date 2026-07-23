using Buslink.Api.Settings;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace Buslink.Api.Services;

public class EmailService
{
    private readonly EmailSettings _settings;

    public EmailService(IOptions<EmailSettings> settings) => _settings = settings.Value;

    public async Task SendOtpEmailAsync(string toEmail, string recipientName, string otp, CancellationToken ct = default)
    {
        ct.ThrowIfCancellationRequested();

        using var message = new MailMessage(
            new MailAddress(_settings.SenderEmail, _settings.SenderName),
            new MailAddress(toEmail, recipientName))
        {
            Subject = "Your BusLink verification code",
            Body = $"Hi {recipientName},\n\nYour BusLink verification code is: {otp}\nThis code expires in 2 minutes.\n\nIf you didn't request this, you can safely ignore this email.\n\n- BusLink"
        };

        using var client = new SmtpClient(_settings.SmtpServer, _settings.Port)
        {
            EnableSsl = true,
            Credentials = new NetworkCredential(_settings.Username, _settings.Password)
        };

        await client.SendMailAsync(message);
    }
}
