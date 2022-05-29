using CateringBackend.CrossTests.Client.Requests;
using CateringBackend.CrossTests.Diets;
using CateringBackend.CrossTests.Meals;
using CateringBackend.CrossTests.Producer;
using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CateringBackend.CrossTests.Client
{
    public static class ClientActions
    {
        public static async Task<HttpResponseMessage> Register(HttpClient httpClient, RegisterRequest registerRequest)
        {
            var body = JsonConvert.SerializeObject(registerRequest).ToStringContent();
            return await httpClient.PostAsync(ClientUrls.GetRegisterUrl(), body);
        }

        public static async Task<HttpResponseMessage> Login(HttpClient httpClient, LoginRequest request)
        {
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await httpClient.PostAsync(ClientUrls.GetLoginUrl(), body);
        }

        public static async Task<RegisterRequest> RegisterAndLogin(HttpClient httpClient, bool isValid = true)
        {
            var registerRequest = ClientRequestsProvider.PrepareRegisterRequest();
            await Register(httpClient, registerRequest);
            var loginRequest = ClientRequestsProvider.PrepareLoginRequest(registerRequest, isValid);
            var response = await Login(httpClient, loginRequest);
            var bearer = await response.Content.ReadAsStringAsync();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearer);
            return registerRequest;
        }

        public static async Task<HttpResponseMessage> GetOrders(HttpClient httpClient, bool authorize = true, string status = null)
        {
            if (authorize)
                await RegisterAndLogin(httpClient);
            return await httpClient.GetAsync(ClientUrls.GetOrdersUrl(status));
        }

        public static async Task<HttpResponseMessage> CreateOrders(HttpClient httpClient, bool isValid = true)
        {
            await ProducerActions.Authorize(httpClient);
            var meals = await MealsActions.PostAndGetMealIds(httpClient);
            var diets = await DietsActions.PostDiet(httpClient, meals.ToArray());
            var dietIds = await DietsActions.GetDietsIds(httpClient);
            var request = ClientRequestsProvider.PrepareOrdersRequest(dietIds.ToArray(), isValid);
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            await RegisterAndLogin(httpClient);
            return await httpClient.PostAsync(ClientUrls.GetOrdersUrl(), body);
        }

        public static async Task<IEnumerable<Guid>> CreateOrderAndReturnId(HttpClient httpClient, string status = null)
        {
            var postResponse = await CreateOrders(httpClient);
            var ordersResponse = await GetOrders(httpClient, false, status);
            var ordersContent = await ordersResponse.Content.ReadAsStringAsync();
            var orderIds = JsonConvert.DeserializeObject<IEnumerable<Order>>(ordersContent);
            return orderIds.Select(x => x.Id);
        }

        public static async Task<HttpResponseMessage> SendComplain(HttpClient httpClient, object orderId)
        {
            var request = ClientRequestsProvider.PrepareComplainRequest();
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await httpClient.PostAsync(ClientUrls.GetOrdersComplainUrl(orderId), body);
        }

        public static async Task<HttpResponseMessage> PayOrder(HttpClient httpClient, object orderId)
        {
            return await httpClient.PostAsync(ClientUrls.GetOrdersPayUrl(orderId), null);
        }

        public static async Task<Guid> CreatePaidOrder(HttpClient httpClient)
        {
            await ProducerActions.Authorize(httpClient);
            var meals = await MealsActions.PostAndGetMealIds(httpClient);
            var diets = await DietsActions.PostDiet(httpClient, meals.ToArray());
            var dietIds = await DietsActions.GetDietsIds(httpClient);
            var request = ClientRequestsProvider.PrepareOrdersRequest(dietIds.ToArray());
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            await RegisterAndLogin(httpClient);
            await httpClient.PostAsync(ClientUrls.GetOrdersUrl(), body);
            var ordersResponse = await httpClient.GetAsync(ClientUrls.GetOrdersUrl());
            var ordersContent = await ordersResponse.Content.ReadAsStringAsync();
            var orders = JsonConvert.DeserializeObject<IEnumerable<Order>>(ordersContent);
            var order = orders.FirstOrDefault(x => x.Diets.Select(x => x.DietId).Intersect(dietIds).Count() == dietIds.Count());
            var payResponse = await PayOrder(httpClient, order.Id);
            return order.Id;
        }
    }
}
