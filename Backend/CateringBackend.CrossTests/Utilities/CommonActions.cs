using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CateringBackend.CrossTests.Utilities
{
    public static class CommonActions
    {
        public static async Task SetAuthToken(HttpResponseMessage response, HttpClient httpClient)
        {
            var bearer = await response.Content.ReadAsStringAsync();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearer);
        }
    }
}
