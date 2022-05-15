using CateringBackend.CrossTests.Utilities;

namespace CateringBackend.CrossTests.Diets
{
    public static class DietsUrls
    {
        public const string BaseDietsUrl = TestsConstants.BaseUrl + "/diets";
        public static string GetDietsUrl() => BaseDietsUrl;
        public static string GetDietUrl(object dietId) => $"{BaseDietsUrl}/{dietId}";
    }
}
