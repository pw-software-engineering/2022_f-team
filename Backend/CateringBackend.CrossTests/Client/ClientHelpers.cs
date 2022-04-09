using CateringBackend.CrossTests.Client.Requests;
using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CateringBackend.CrossTests.Client
{
    public static class ClientHelpers
    {
        public const string BaseUrl = TestsConstants.BaseUrl + "/client";
        public static string GetRegisterUrl() => $"{BaseUrl}/register";
        public static string GetLoginUrl() => $"{BaseUrl}/login";
        public static string GetOrdersUrl() => $"{BaseUrl}/orders";
        public static string GetAccountUrl() => $"{BaseUrl}/account";
        public static string GetOrdersComplainUrl(int orderId) => $"{BaseUrl}/orders/{orderId}/complain";
        public static string GetOrdersPayUrl(int orderId) => $"{BaseUrl}/orders/{orderId}/pay";


        public static async Task<HttpResponseMessage> Register(HttpClient httpClient, RegisterRequest registerRequest)
        {
            var body = JsonConvert.SerializeObject(registerRequest).ToStringContent();
            return await httpClient.PostAsync(GetRegisterUrl(), body);
        }
        public static async Task<HttpResponseMessage> Login(HttpClient httpClient, LoginRequest request)
        {
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await httpClient.PostAsync(GetLoginUrl(), body);
        }

        public static async Task<RegisterRequest> RegisterAndLogin(HttpClient httpClient, bool isValid = true)
        {
            var request = PrepareRegisterRequest();
            await Register(httpClient, request);
            var loginRequest = PrepareLoginRequest(request, isValid);
            var response = await Login(httpClient, loginRequest);
            var bearer = await response.Content.ReadAsStringAsync();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearer);
            return request;
        }

        public static async Task<HttpResponseMessage> GetOrders(HttpClient httpClient, bool authorize = true)
        {
            if (authorize)
                await RegisterAndLogin(httpClient);
            return await httpClient.GetAsync(GetOrdersUrl());
        }

        public static async Task<HttpResponseMessage> CreateOrders(HttpClient httpClient, bool isValid = true, bool authorize = true)
        {
            if (authorize)
                await RegisterAndLogin(httpClient);
            var request = PrepareOrdersRequest(isValid);
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await httpClient.PostAsync(GetOrdersUrl(), body);
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
            var request = PrepareComplainRequest();
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await httpClient.PostAsync(GetOrdersComplainUrl(orderId), body);
        }

        public static async Task<HttpResponseMessage> PayOrder(HttpClient httpClient, int orderId)
        {
            return await httpClient.PostAsync(GetOrdersPayUrl(orderId), null);
        }

        public static RegisterRequest PrepareRegisterRequest(bool isValid = true)
        {
            var fakerRegister = FakerHelper.GetFaker<RegisterRequest>()
                .RuleFor(x => x.Name, f => f.Name.FirstName())
                .RuleFor(x => x.LastName, f => f.Name.LastName())
                .RuleFor(x => x.Email, f => f.Internet.Email())
                .RuleFor(x => x.Password, f => f.Internet.Password())
                .RuleFor(x => x.PhoneNumber, f => f.Phone.PhoneNumber());
            var registerRequest = fakerRegister.Generate();

            if (isValid)
            {
                var address = PrepareAddress();
                registerRequest.Address = address;
            }
            return registerRequest;
        }

        public static LoginRequest PrepareLoginRequest(RegisterRequest registerRequest, bool isValid = true)
        {
            var loginFaker = FakerHelper.GetFaker<LoginRequest>()
                .RuleFor(x => x.Password, f => f.Internet.Password(5));

            var loginRequest = loginFaker.Generate();
            loginRequest.Email = registerRequest.Email;
            if (isValid)
                loginRequest.Password = registerRequest.Password;
            return loginRequest;
        }

        public static EditClientRequest PrepareEditClientRequest(bool isValid = true)
        {
            var fakerEdit = FakerHelper.GetFaker<EditClientRequest>()
                .RuleFor(x => x.Name, f => f.Name.FirstName())
                .RuleFor(x => x.LastName, f => f.Name.LastName())
                .RuleFor(x => x.Password, f => f.Internet.Password())
                .RuleFor(x => x.PhoneNumber, f => f.Phone.PhoneNumber());
            var editRequest = fakerEdit.Generate();
            editRequest.Address = PrepareAddress();
            if (!isValid)
                editRequest.Password = null;
            return editRequest;
        }

        public static ClientAddress PrepareAddress()
        {
            var fakeAddress = FakerHelper.GetFaker<ClientAddress>()
                    .RuleFor(x => x.Street, f => f.Address.StreetName())
                    .RuleFor(x => x.BuildingNumber, f => f.Random.Number(20).ToString())
                    .RuleFor(x => x.ApartmentNumber, f => f.Random.Number(20).ToString())
                    .RuleFor(x => x.PostCode, f => f.Address.ZipCode("##-###"))
                    .RuleFor(x => x.City, f => f.Address.City());

            return fakeAddress.Generate();
        }
        public static PostOrdersRequest PrepareOrdersRequest(bool isValid = true)
        {
            var dietIds = new string[] { "1", "2" };
            var fakerOrders = FakerHelper.GetFaker<PostOrdersRequest>()
                .RuleFor(x => x.DietIds, f => dietIds)
                .RuleFor(x => x.StartDate, f => f.Date.Between(new DateTime(2022, 1, 1), new DateTime(2022, 2, 1)))
                .RuleFor(x => x.EndDate, f => f.Date.Between(new DateTime(2022, 2, 2), new DateTime(2022, 3, 1)));

            var orderRequest = fakerOrders.Generate();

            if (isValid)
            {
                orderRequest.DeliveryDetails = FakerHelper.GetFaker<DeliveryDetails>()
                    .RuleFor(x => x.Address, f => PrepareAddress())
                    .RuleFor(x => x.CommentForDeliverer, f => f.Lorem.Sentence(5))
                    .RuleFor(x => x.PhoneNumber, f => f.Phone.PhoneNumber())
                    .Generate();
            }

            return orderRequest;
        }

        public static PostComplainRequest PrepareComplainRequest()
        {
            var fakerComplain = FakerHelper.GetFaker<PostComplainRequest>()
                .RuleFor(x => x.Complain_Description, f => f.Lorem.Sentence(5));

            return fakerComplain.Generate();
        }
    }
}
