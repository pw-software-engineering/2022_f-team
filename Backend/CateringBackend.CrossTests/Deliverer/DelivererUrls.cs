using CateringBackend.CrossTests.Utilities;

namespace CateringBackend.CrossTests.Deliverer
{
    public static class DelivererUrls
    {
        public static string BaseDelivererUrl = UrlProvider.BaseUrl + "/deliverer";
        public static string GetLoginUrl() => $"{BaseDelivererUrl}/login";
    }
}
