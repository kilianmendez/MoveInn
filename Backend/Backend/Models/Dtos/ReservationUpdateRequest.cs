using Backend.Models.Database.Enum;

namespace Backend.Models.Dtos
{
    public class ReservationUpdateRequest
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal? TotalPrice { get; set; }
        public ReservationStatus? Status { get; set; }
    }
}
