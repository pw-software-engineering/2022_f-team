using CateringBackend.CrossTests.Utilities;

namespace CateringBackend.CrossTests.Diets
{
    public static class DietsUrls
    {
        public static string BaseDietsUrl = UrlProvider.BaseUrl + "/diets";
        public static string GetDietsUrl() => BaseDietsUrl;
        public static string GetDietUrl(string dietId) => $"{BaseDietsUrl}/{dietId}";
    }
}
