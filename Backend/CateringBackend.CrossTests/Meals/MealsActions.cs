using CateringBackend.CrossTests.Meals.Requests;
using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CateringBackend.CrossTests.Meals
{
    public static class MealsActions
    {
        public static async Task<HttpResponseMessage> GetMeals(HttpClient httpClient)
        {
            return await httpClient.GetAsync(MealsUrls.GetMealsUrl());
        }
        public static async Task<IEnumerable<object>> GetMealsIds(HttpClient httpClient)
        {
            var getResponse = await GetMeals(httpClient);
            var getContent = await getResponse.Content.ReadAsStringAsync();
            if (getContent == null) return null;
            var diets = JsonConvert.DeserializeObject<IEnumerable<Meal>>(getContent);
            return diets?.Select(x => x.MealId).ToList();
        }

        public static async Task<IEnumerable<object>> PostAndGetMealIds(HttpClient httpClient)
        {
            var postResponse = await PostMeals(httpClient);
            return await GetMealsIds(httpClient);
        }

        public static async Task<HttpResponseMessage> GetMeal(HttpClient httpClient, object mealId)
        {
            return await httpClient.GetAsync(MealsUrls.GetMealUrl(mealId));
        }

        public static async Task<HttpResponseMessage> PutMeal(HttpClient httpClient, bool isValid = true)
        {
            var postResponse = await PostMeals(httpClient, isValid);
            if (!postResponse.IsSuccessStatusCode)
                return postResponse;
            var mealIds = await GetMealsIds(httpClient);
            var putRequest = MealsRequestsProvider.PrepareMeals(1).First();
            putRequest.MealId = mealIds.FirstOrDefault() as string;
            var putBody = JsonConvert.SerializeObject(putRequest).ToStringContent();
            var putResponse = await httpClient.PutAsync(MealsUrls.GetMealUrl(mealIds?.FirstOrDefault() ?? TestsConstants.GetDefaultId()), putBody);
            return putResponse;
        }

        public static async Task<HttpResponseMessage> PostMeals(HttpClient httpClient, bool isValid = true)
        {
            var meal = MealsRequestsProvider.PrepareMeals(3, isValid);
            var postRequest = ObjectPropertiesMapper.ConvertObject<Meal, PostMealRequest>(meal.First());
            var body = JsonConvert.SerializeObject(postRequest).ToStringContent();
            return await httpClient.PostAsync(MealsUrls.GetMealsUrl(), body);
        }

        public static async Task<HttpResponseMessage> DeleteMeal(HttpClient httpClient, object mealId)
        {
            return await httpClient.DeleteAsync(MealsUrls.GetMealUrl(mealId));
        }
    }
}
