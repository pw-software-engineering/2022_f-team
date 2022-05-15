using CateringBackend.CrossTests.Utilities;

namespace CateringBackend.CrossTests.Meals
{
    public static class MealsUrls
    {
        public const string BaseMealsUrl = TestsConstants.BaseUrl + "/meals";
        public static string GetMealsUrl() => BaseMealsUrl;
        public static string GetMealUrl(object mealId) => $"{BaseMealsUrl}/{mealId}";
    }
}
