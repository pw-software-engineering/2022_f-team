using System;

namespace CateringBackend.Domain.Entities
{
    public class Client
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public Guid AddressId { get; set; }
        public Address Address { get; set; }

        public static Client Create(string email, string encryptedPassword, string firstName, string lastName, string phoneNumber, Guid addressId)
        {
            return new Client()
            {
                Email = email,
                Password = encryptedPassword,
                FirstName = firstName,
                LastName = lastName,
                PhoneNumber = phoneNumber,
                AddressId = addressId,
            };
        }
    }
}
