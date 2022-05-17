using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Meals.Requests;
using CateringBackend.CrossTests.Producer;
using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests.Meals.Tests
{
    public class DeleteMealTests
    {
        private readonly HttpClient _httpClient;

        public DeleteMealTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async Task DeleteMeal_NotLoggedIn_ReturnsUnauthorized()
        {
            var mealIds = await MealsActions.PostAndGetMealIds(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, mealIds?.First() ?? new Guid().ToString());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMeal_DelivererLoggedIn_ReturnsForbidden()
        {
            await DelivererActions.Authorize(_httpClient);
            var mealIds = await MealsActions.PostAndGetMealIds(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, mealIds?.First() ?? new Guid().ToString());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMeal_ProducerLoggedIn_ReturnsOk()
        {
            await ProducerActions.Authorize(_httpClient);
            var postMeal = MealsRequestsProvider.PrepareMeals(1).SingleOrDefault();
            var postRequest = ObjectPropertiesMapper.ConvertObject<Meal, PostMealRequest>(postMeal);
            var body = JsonConvert.SerializeObject(postRequest).ToStringContent();
            var postResponse = await _httpClient.PostAsync(MealsUrls.GetMealsUrl(), body);
            var getResponse = await MealsActions.GetMeals(_httpClient);
            var getContent = await getResponse.Content.ReadAsStringAsync();
            var meals = JsonConvert.DeserializeObject<IEnumerable<Meal>>(getContent);
            var meal = meals.SingleOrDefault(x => x.Name == postMeal.Name);
            var response = await MealsActions.DeleteMeal(_httpClient, meal.MealId ?? new Guid().ToString());
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var mealIdsAfterDelete = await MealsActions.GetMealsIds(_httpClient);
            Assert.True(!mealIdsAfterDelete.Contains(meal.MealId));
        }

        [Fact]
        public async Task DeleteMeal_ClientLoggedIn_ReturnsForbidden()
        {
            await ClientActions.RegisterAndLogin(_httpClient);
            var mealIds = await MealsActions.GetMealsIds(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, mealIds?.First() ?? new Guid().ToString());
            Assert.Equal(HttpStatusCode.Forbidden, response.StatusCode);
        }

        [Fact]
        public async Task DeleteMeal_InvalidId_ReturnsNotFound()
        {
            await ProducerActions.Authorize(_httpClient);
            var response = await MealsActions.DeleteMeal(_httpClient, new Guid().ToString());
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
