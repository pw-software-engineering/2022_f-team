using CateringBackend.CrossTests.Utilities;

namespace CateringBackend.CrossTests.Deliverer
{
    public static class DelivererUrls
    {
        public const string BaseDelivererUrl = TestsConstants.BaseUrl + "/deliverer";
        public static string GetLoginUrl() => $"{BaseDelivererUrl}/login";
    }
}
