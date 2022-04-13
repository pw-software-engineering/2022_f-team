using System;
using System.Collections.Generic;
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
    }
}
