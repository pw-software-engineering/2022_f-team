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
    public static class DelivererActions
    {
        public static async Task Login(HttpClient httpClient)
        {
            var loginRequest = DelivererRequestsProvider.PrepareLoginRequest();
            var body = JsonConvert.SerializeObject(loginRequest).ToStringContent();
            var response =  await httpClient.PostAsync(DelivererUrls.GetLoginUrl(), body);
            var bearer = await response.Content.ReadAsStringAsync();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearer);
        }
    }
}
