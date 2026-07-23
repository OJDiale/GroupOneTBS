namespace Buslink.Api.Services;

public interface IOtpService
{
    string GenerateOtp();
    string GenerateResetToken();
    string Hash(string value);
}
