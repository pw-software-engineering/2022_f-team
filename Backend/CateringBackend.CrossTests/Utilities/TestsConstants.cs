using System;
using System.Collections.Generic;
using System.Text;

namespace CateringBackend.CrossTests.Utilities
{
    public static class TestsConstants
    {
        public const string BaseUrl = "https://localhost:5001";
        public static object GetDefaultId() => new Guid().ToString();
        //public static object GetDefaultId() => -1;
    }
}
