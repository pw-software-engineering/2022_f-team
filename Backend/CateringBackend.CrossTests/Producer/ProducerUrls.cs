using CateringBackend.CrossTests.Utilities;

namespace CateringBackend.CrossTests.Producer
{
    public static class ProducerUrls
    {
        public static string BaseProducerUrl = UrlProvider.BaseUrl + "/producer";
        public static string GetLoginUrl() => $"{BaseProducerUrl}/login";
    }
}
