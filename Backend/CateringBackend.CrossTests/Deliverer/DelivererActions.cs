using CateringBackend.CrossTests.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CateringBackend.CrossTests.Deliverer
{
    public class DelivererActions
    {
        public  async Task Authorize(HttpClient httpClient, bool isValid = true)
        {
            var response = await Login(httpClient, isValid);
            await CommonActions.SetAuthToken(response, httpClient);
        }

        public async Task<HttpResponseMessage> Login(HttpClient httpClient, bool isValid = true)
        {
            var loginRequest = DelivererRequestsProvider.PrepareLoginRequest(isValid);
            var body = JsonConvert.SerializeObject(loginRequest).ToStringContent();
            return await httpClient.PostAsync(DelivererUrls.GetLoginUrl(), body);
        }
    }
}
