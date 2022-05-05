using CateringBackend.CrossTests.Utilities;

namespace CateringBackend.CrossTests.Producer
{
    public static class ProducerUrls
    {
        public const string BaseProducerUrl = TestsConstants.BaseUrl + "/producer";
        public static string GetLoginUrl() => $"{BaseProducerUrl}/login";
    }
}
