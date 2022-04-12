using CateringBackend.CrossTests.Client.Requests;
using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
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

        public static async Task<HttpResponseMessage> GetOrders(HttpClient httpClient, bool authorize = true)
        {
            if (authorize)
                await RegisterAndLogin(httpClient);
            return await httpClient.GetAsync(ClientUrls.GetOrdersUrl());
        }

        public static async Task<HttpResponseMessage> CreateOrders(HttpClient httpClient, bool isValid = true, bool authorize = true)
        {
            if (authorize)
                await RegisterAndLogin(httpClient);
            var request = ClientRequestsProvider.PrepareOrdersRequest(isValid);
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await httpClient.PostAsync(ClientUrls.GetOrdersUrl(), body);
        }

        public static async Task<IEnumerable<int>> CreateOrderAndReturnId(HttpClient httpClient)
        {
            await CreateOrders(httpClient);
            var ordersResponse = await GetOrders(httpClient, false);
            var ordersContent = await ordersResponse.Content.ReadAsStringAsync();
            var orderIds = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(ordersContent);
            return (IEnumerable<int>)(orderIds.Select(x => x.Id));
        }

        public static async Task<HttpResponseMessage> SendComplain(HttpClient httpClient, int orderId)
        {
            var request = ClientRequestsProvider.PrepareComplainRequest();
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await httpClient.PostAsync(ClientUrls.GetOrdersComplainUrl(orderId), body);
        }

        public static async Task<HttpResponseMessage> PayOrder(HttpClient httpClient, int orderId)
        {
            return await httpClient.PostAsync(ClientUrls.GetOrdersPayUrl(orderId), null);
        }
    }
}
