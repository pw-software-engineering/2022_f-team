using CateringBackend.CrossTests.Client.Requests;

namespace CateringBackend.CrossTests.Producer
{
    public static class ProducerRequestsProvider
    {
        public static LoginRequest PrepareLoginRequest(bool isValid = true)
        {
            var request =  new LoginRequest()
            {
                Email = "producent@producent.pl",
                Password = "Producent123!"
            };
            if (!isValid)
                request.Password = string.Empty;

            return request;
        }
    }
}
