namespace CateringBackend.CrossTests.Requests
{
    public class EditClientRequest
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public ClientAddress Address { get; set; }
    }
}
