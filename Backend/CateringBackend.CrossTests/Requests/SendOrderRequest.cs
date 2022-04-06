using System;
using System.Collections.Generic;
using System.Text;

namespace CateringBackend.CrossTests.Requests
{
    public class PostOrdersRequest
    {
        public string[] DietIds { get; set; }
        public DeliveryDetails DeliveryDetails { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class DeliveryDetails
    {
        public ClientAddress Address { get; set; }
        public string PhoneNumber { get; set; }
        public string CommentForDeliverer { get; set; }
    }
}
