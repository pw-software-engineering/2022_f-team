using System.Text.RegularExpressions;

namespace CateringBackend.Utilities
{
    public static class ValidationConstants
    {
        public static Regex PhoneNumberRegex = new Regex(@"^\+48[0-9]{9}$");
        public static int MinimumPasswordLength = 8;
    }
}
