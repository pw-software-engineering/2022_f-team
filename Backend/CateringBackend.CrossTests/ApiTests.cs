using CateringBackend.CrossTests.Requests;
using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace CateringBackend.CrossTests
{
    public class ApiTests
    {
        private readonly string _baseUrl = "https://localhost:5001/client";
        private readonly HttpClient _httpClient;

        public ApiTests()
        {
            _httpClient = new HttpClient();
        }

        [Fact]
        public async void RegisterClient_HasAllData_ReturnsCreated()
        {
            var request = PrepareRegisterRequest();
            var response = await Register(request);

            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        [Fact]
        public async void RegisterClient_HasNoAddress_ReturnsBadRequest()
        {
            var request = PrepareRegisterRequest(false);
            var response = await Register(request);

            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async void LoginClient_HasCorrectData_ReturnsOK()
        {
            var request = PrepareRegisterRequest();
            await Register(request);

            var loginRequest = PrepareLoginRequest(request);
            var response = await Login(loginRequest);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async void LoginClient_HasIncorrectPassword_ReturnsBadRequest()
        {
            var request = PrepareRegisterRequest();
            await Register(request);

            var loginRequest = PrepareLoginRequest(request, false);
            var response = await Login(loginRequest);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task GetClientDetails_IsLoggedIn_ReturnsOK()
        {
            var path = $"{_baseUrl}/account";
            await RegisterAndLogin();
            var getResponse = await _httpClient.GetAsync(path);
            Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
        }

        [Fact]
        public async Task GetClientDetails_NotLoggedIn_ReturnsUnauthorized()
        {
            var path = $"{_baseUrl}/account";
            var getResponse = await _httpClient.GetAsync(path);
            Assert.Equal(HttpStatusCode.Unauthorized, getResponse.StatusCode);
        }

        [Fact]
        public async void UpdateClientDetails_ProvidedCompleteData_ReturnsOK()
        {
            var path = $"{_baseUrl}/account";
            await RegisterAndLogin();
            var request = PrepareEditClientRequest();
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            var response = await _httpClient.PutAsync(path, body);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async void UpdateClientDetails_NotLoggedIn_ReturnsUnauthorized()
        {
            var path = $"{_baseUrl}/account";
            var request = PrepareEditClientRequest();
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            var response = await _httpClient.PutAsync(path, body);
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async void UpdateClientDetails_ProvidedInCompleteData_ReturnsBadRequest()
        {
            var path = $"{_baseUrl}/account";
            await RegisterAndLogin();
            var request = PrepareEditClientRequest(false);
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            var response = await _httpClient.PutAsync(path, body);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Fact]
        public async Task GetOrders_IsLoggedIn_ReturnsOK()
        {
            var getResponse = await GetOrders();
            Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
        }

        [Fact]
        public async Task GetOrders_NotLoggedIn_ReturnsUnauthorized()
        {
            var getResponse = await GetOrders(false);
            Assert.Equal(HttpStatusCode.Unauthorized, getResponse.StatusCode);
        }

        [Fact]
        public async Task SendOrders_ProvidedCompleteData_ReturnsOK()
        {
            var getResponse = await CreateOrders();
            Assert.Equal(HttpStatusCode.Created, getResponse.StatusCode);
        }

        [Fact]
        public async Task SendOrders_NotLoggedIn_ReturnsUnauthorized()
        {
            var getResponse = await CreateOrders(isValid: true, authorize: false);
            Assert.Equal(HttpStatusCode.Unauthorized, getResponse.StatusCode);
        }

        [Fact]
        public async Task SendComplain_CorrectData_ReturnsCreated()
        {
            var orderIds = await CreateOrderAndReturnId();

            var response = await SendComplain(orderIds.First());
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        [Fact]
        public async Task SendComplain_NotLoggedIn_ReturnsUnauthorized()
        {
            var orderIds = await CreateOrderAndReturnId();
            _httpClient.RemoveAuthorization();

            var response = await SendComplain(orderIds.First());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task SendComplain_InvalidOrderId_ReturnsNotFound()
        {
            await CreateOrderAndReturnId();
            var invalidId = -1;

            var response = await SendComplain(invalidId);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task PayOrder_ValidOrderId_ReturnsCreated()
        {
            var orderIds = await CreateOrderAndReturnId();
            var response = await PayOrder(orderIds.First());
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        }

        [Fact]
        public async Task PayOrder_NotLoggedIn_Unauthorized()
        {
            var orderIds = await CreateOrderAndReturnId();
            _httpClient.RemoveAuthorization();
            var response = await PayOrder(orderIds.First());
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task PayOrder_InvalidOrderId_ReturnsNotFound()
        {
            await CreateOrderAndReturnId();
            var invalidId = -1;
            var response = await PayOrder(invalidId);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }


        private async Task<HttpResponseMessage> Register(RegisterRequest registerRequest)
        {
            var path = $"{_baseUrl}/register";
            var body = JsonConvert.SerializeObject(registerRequest).ToStringContent();
            return await _httpClient.PostAsync(path, body);
        }
        private async Task<HttpResponseMessage> Login(LoginRequest request)
        {
            var path = $"{_baseUrl}/login";
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await _httpClient.PostAsync(path, body);
        }

        private async Task RegisterAndLogin(bool isValid = true)
        {
            var request = PrepareRegisterRequest();
            await Register(request);
            var loginRequest = PrepareLoginRequest(request, isValid);
            var response = await Login(loginRequest);
            var bearer = await response.Content.ReadAsStringAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearer);
        }

        private async Task<HttpResponseMessage> GetOrders(bool authorize = true)
        {
            var path = $"{_baseUrl}/orders";
            if (authorize)
                await RegisterAndLogin();
            return await _httpClient.GetAsync(path);
        }

        private async Task<HttpResponseMessage> CreateOrders(bool isValid = true, bool authorize = true)
        {
            var path = $"{_baseUrl}/orders";
            if (authorize)
                await RegisterAndLogin();
            var request = PrepareOrdersRequest(isValid);
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await _httpClient.PostAsync(path, body);
        }

        private async Task<IEnumerable<int>> CreateOrderAndReturnId()
        {
            await CreateOrders();
            var ordersResponse = await GetOrders(false);
            var ordersContent = await ordersResponse.Content.ReadAsStringAsync();
            var orderIds = JsonConvert.DeserializeObject<IEnumerable<dynamic>>(ordersContent);
            return (IEnumerable<int>)(orderIds.Select(x => x.Id));
        }

        private async Task<HttpResponseMessage> SendComplain(int orderId)
        {
            var path = $"{_baseUrl}/orders/{orderId}/complain";
            var request = PrepareComplainRequest();
            var body = JsonConvert.SerializeObject(request).ToStringContent();
            return await _httpClient.PostAsync(path, body);
        }

        private async Task<HttpResponseMessage> PayOrder(int orderId)
        {
            var path = $"{_baseUrl}/orders/{orderId}/pay";
            return await _httpClient.PostAsync(path, null);
        }

        private RegisterRequest PrepareRegisterRequest(bool isValid = true)
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

        private LoginRequest PrepareLoginRequest(RegisterRequest registerRequest, bool isValid = true)
        {
            var loginFaker = FakerHelper.GetFaker<LoginRequest>()
                .RuleFor(x => x.Password, f => f.Internet.Password(5));

            var loginRequest = loginFaker.Generate();
            loginRequest.Email = registerRequest.Email;
            if (isValid)
                loginRequest.Password = registerRequest.Password;
            return loginRequest;
        }

        private EditClientRequest PrepareEditClientRequest(bool isValid = true)
        {
            var fakerEdit = FakerHelper.GetFaker<EditClientRequest>()
                .RuleFor(x => x.Name, f => f.Name.FirstName())
                .RuleFor(x => x.LastName, f => f.Name.LastName())
                .RuleFor(x => x.Password, f => f.Internet.Password())
                .RuleFor(x => x.PhoneNumber, f => f.Phone.PhoneNumber());
            var editRequest = fakerEdit.Generate();
            if (!isValid)
                editRequest.Password = null;
            return editRequest;
        }

        private ClientAddress PrepareAddress()
        {
            var fakeAddress = FakerHelper.GetFaker<ClientAddress>()
                    .RuleFor(x => x.Street, f => f.Address.StreetName())
                    .RuleFor(x => x.BuildingNumber, f => f.Random.Number(20).ToString())
                    .RuleFor(x => x.ApartmentNumber, f => f.Random.Number(20).ToString())
                    .RuleFor(x => x.PostCode, f => f.Address.ZipCode("##-###"))
                    .RuleFor(x => x.City, f => f.Address.City());

            return fakeAddress.Generate();
        }
        private PostOrdersRequest PrepareOrdersRequest(bool isValid = true)
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

        private PostComplainRequest PrepareComplainRequest()
        {
            var fakerComplain = FakerHelper.GetFaker<PostComplainRequest>()
                .RuleFor(x => x.Complain_Description, f => f.Lorem.Sentence(5));

            return fakerComplain.Generate();
        }
    }
}
