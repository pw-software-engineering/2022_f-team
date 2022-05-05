using CateringBackend.CrossTests.Client;
using CateringBackend.CrossTests.Deliverer;
using CateringBackend.CrossTests.Producer;
using ExpectedObjects;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests.Diets.Tests
{
    //public class PutDietTests
    //{
    //    private readonly HttpClient _httpClient;

    //    public PutDietTests()
    //    {
    //        _httpClient = new HttpClient();
    //    }

    //    [Fact]
    //    public async Task PutDiet_NotLoggedIn_ReturnsUnauthorized()
    //    {
    //        var response = await DietsActions.PutDiet(_httpClient);
    //        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    //    }

    //    [Fact]
    //    public async Task PutDiet_DelivererLoggedIn_ReturnsUnauthorized()
    //    {
    //        await DelivererActions.Login(_httpClient);
    //        var response = await DietsActions.PutDiet(_httpClient);
    //        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    //    }

    //    [Fact]
    //    public async Task PutDiet_ProducerLoggedIn_ReturnsOk()
    //    {
    //        await ProducerActions.Login(_httpClient);
    //        var response = await DietsActions.PutDiet(_httpClient);
    //        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    //        var getResponse = await DietsActions.GetDiets(_httpClient);
    //        var getContent = await getResponse.Content.ReadAsStringAsync();
    //        var diets = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(getContent);
    //        Assert.NotEmpty(diets);
    //    }

    //    [Fact]
    //    public async Task PutDiet_ClientLoggedIn_ReturnsUnauthorized()
    //    {
    //        await ClientActions.RegisterAndLogin(_httpClient);
    //        var response = await DietsActions.PutDiet(_httpClient);
    //        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    //    }

    //    [Fact]
    //    public async Task PutDiet_DietWithNoMeals_ReturnsBadRequest()
    //    {
    //        await ProducerActions.Login(_httpClient);
    //        var postResponse = await DietsActions.PostDietWithMeals(_httpClient);
    //        var getResponse = await DietsActions.GetDiets(_httpClient);
    //        var getContent = await getResponse.Content.ReadAsStringAsync();
    //        var diets = JsonConvert.DeserializeObject<IEnumerable<Diet>>(getContent);
    //        var response = await DietsActions.PutDiet(_httpClient, diets.First().DietId);
    //        var putContent = await getResponse.Content.ReadAsStringAsync();
    //        var getUpdatedResponse = await DietsActions.GetDiet(_httpClient, diets.First().DietId);
    //        var getUpdatedContent = await getResponse.Content.ReadAsStringAsync();
    //        var updatedItem = JsonConvert.DeserializeObject<Diet>(getUpdatedContent);
    //        updatedItem.ToExpectedObject().ShouldEqual(true);
    //        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    //    }
    //}
}
