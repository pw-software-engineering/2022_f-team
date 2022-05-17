using CateringBackend.CrossTests.Meals;
using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CateringBackend.CrossTests.Diets
{
    public static class DietsActions
    {
        public static async Task<HttpResponseMessage> GetDiets(HttpClient httpClient)
        {
            return await httpClient.GetAsync(DietsUrls.GetDietsUrl());
        }

        public static async Task<IEnumerable<object>> GetDietsIds(HttpClient httpClient)
        {
            var getResponse = await GetDiets(httpClient);
            var getContent = await getResponse.Content.ReadAsStringAsync();
            var diets = JsonConvert.DeserializeObject<IEnumerable<Diet>>(getContent);
            return diets.Select(x => x.DietId).ToList();
        }

        public static async Task<HttpResponseMessage> PostDiet(HttpClient httpClient, object[] mealIds, bool isValid = true)
        {
            var postRequest = DietsRequestsProvider.PreparePostDietRequest(mealIds, isValid);
            var body = JsonConvert.SerializeObject(postRequest).ToStringContent();
            return await httpClient.PostAsync(DietsUrls.GetDietsUrl(), body);
        }

        public static async Task<HttpResponseMessage> GetDiet(HttpClient httpClient, object dietId)
        {
            return await httpClient.GetAsync(DietsUrls.GetDietUrl(dietId));
        }

        public static async Task<HttpResponseMessage> PutDiet(HttpClient httpClient, object[] mealIds, bool isValid = true)
        {
            var postResponse = await PostDiet(httpClient, mealIds, isValid);
            var dietIds = await GetDietsIds(httpClient);
            var putRequest = MealsRequestsProvider.PrepareMeals(1);
            var putBody = JsonConvert.SerializeObject(putRequest).ToStringContent();
            var putResponse = await httpClient.PutAsync(DietsUrls.GetDietUrl(dietIds.First()), putBody);
            return putResponse;
        }

        public static async Task<HttpResponseMessage> DeleteDiet(HttpClient httpClient, object dietId)
        {
            return await httpClient.DeleteAsync(DietsUrls.GetDietUrl(dietId));
        }


    }
}
