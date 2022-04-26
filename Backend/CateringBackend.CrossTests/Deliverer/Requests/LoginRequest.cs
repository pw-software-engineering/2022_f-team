using System;
using System.Collections.Generic;
using System.Text;

namespace CateringBackend.CrossTests.Deliverer.Requests
{
    public  class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
