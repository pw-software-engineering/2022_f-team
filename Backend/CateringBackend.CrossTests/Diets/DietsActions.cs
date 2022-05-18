using CateringBackend.CrossTests.Meals;
using CateringBackend.CrossTests.Producer;
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

        public static async Task<IEnumerable<Guid>> GetDietsIds(HttpClient httpClient)
        {
            var getResponse = await GetDiets(httpClient);
            var getContent = await getResponse.Content.ReadAsStringAsync();
            var diets = JsonConvert.DeserializeObject<IEnumerable<Diet>>(getContent);
            return diets.Select(x => x.Id).ToList();
        }

        public static async Task<HttpResponseMessage> PostDietWithMeals(HttpClient httpClient, bool isValid = true)
        {
            await ProducerActions.Authorize(httpClient);
            var mealIds = await MealsActions.PostAndGetMealIds(httpClient);
            return await PostDiet(httpClient, mealIds.ToArray());
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

        public static async Task<HttpResponseMessage> PutDiet(HttpClient httpClient, bool isValid = true, bool addMeals = true)
        {
            object[] mealIds = null;
            if (addMeals)
                mealIds = (await MealsActions.PostAndGetMealIds(httpClient)).ToArray();
            var postRequest = DietsRequestsProvider.PreparePostDietRequest(mealIds, isValid);
            var body = JsonConvert.SerializeObject(postRequest).ToStringContent();
            var postResponse = await httpClient.PostAsync(DietsUrls.GetDietsUrl(), body);
            var getResponse = await httpClient.GetAsync(DietsUrls.GetDietsUrl(postRequest.Name));
            var getContent = await getResponse.Content.ReadAsStringAsync();
            var diets = JsonConvert.DeserializeObject<IEnumerable<Diet>>(getContent);
            var putRequest = DietsRequestsProvider.PreparePostDietRequest(new object[] { mealIds.First() });
            var putBody = JsonConvert.SerializeObject(putRequest).ToStringContent();
            var putResponse = await httpClient.PutAsync(DietsUrls.GetDietUrl(diets.First().Id), putBody);
            return putResponse;
        }

        public static async Task<HttpResponseMessage> DeleteDiet(HttpClient httpClient, object dietId)
        {
            return await httpClient.DeleteAsync(DietsUrls.GetDietUrl(dietId));
        }


    }
}
