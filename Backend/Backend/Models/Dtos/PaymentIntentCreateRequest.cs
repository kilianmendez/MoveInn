namespace Backend.Models.Dtos
{
    public class PaymentIntentCreateRequest
    {
        public long Amount { get; set; }

        public string Currency { get; set; }
    }
}
