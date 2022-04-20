using CateringBackend.CrossTests.Client.Requests;

namespace CateringBackend.CrossTests.Producer
{
    public static class ProducerRequestsProvider
    {
        public static LoginRequest PrepareLoginRequest()
        {
            return new LoginRequest()
            {
                Email = "producer@gmail.com",
                Password = "producer123"
            };
        }
    }
}
