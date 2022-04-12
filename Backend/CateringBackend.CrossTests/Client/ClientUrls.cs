using CateringBackend.CrossTests.Utilities;

namespace CateringBackend.CrossTests.Client
{
    public static class ClientUrls
    {
        public const string BaseClientUrl = TestsConstants.BaseUrl + "/client";
        public static string GetRegisterUrl() => $"{BaseClientUrl}/register";
        public static string GetLoginUrl() => $"{BaseClientUrl}/login";
        public static string GetOrdersUrl() => $"{BaseClientUrl}/orders";
        public static string GetAccountUrl() => $"{BaseClientUrl}/account";
        public static string GetOrdersComplainUrl(int orderId) => $"{BaseClientUrl}/orders/{orderId}/complain";
        public static string GetOrdersPayUrl(int orderId) => $"{BaseClientUrl}/orders/{orderId}/pay";
    }
}
