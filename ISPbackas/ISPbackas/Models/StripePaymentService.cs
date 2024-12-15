using Stripe;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
public class StripePaymentService
{
    private readonly string _secretKey;

    public StripePaymentService(IConfiguration configuration)
    {
        _secretKey = configuration["Stripe:SecretKey"];
        StripeConfiguration.ApiKey = _secretKey; 
    }

    public async Task<string> CreatePaymentIntentAsync(long amount)
    {
        try
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = amount,
                Currency = "eur",
                PaymentMethodTypes = new List<string> { "card" },
            };
            var service = new PaymentIntentService();
            PaymentIntent intent = await service.CreateAsync(options);

            return intent.ClientSecret; 
        }
        catch (Exception ex)
        {
            throw new Exception($"Error creating payment intent: {ex.Message}");
        }
    }

    public async Task<PaymentIntent> ConfirmPaymentIntent(string paymentIntentId, string paymentMethodId)
    {
        var options = new PaymentIntentConfirmOptions
        {
            PaymentMethod = paymentMethodId
        };

        var service = new PaymentIntentService();
        var paymentIntent = await service.ConfirmAsync(paymentIntentId, options);
        return paymentIntent;
    }
}
