using CateringBackend.CrossTests.Producer.Requests;

namespace CateringBackend.CrossTests.Producer
{
    public static class ProducerRequestsProvider
    {
        public static LoginRequest PrepareLoginRequest()
        {
            return new LoginRequest()
            {
                Email = "deliverer@gmail.com",
                Password = "deliverer"
            };
        }
    }
}
