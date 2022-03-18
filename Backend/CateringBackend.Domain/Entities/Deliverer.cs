using System;

namespace CateringBackend.Domain.Entities
{
    public class Deliverer
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public static Deliverer Create(string email, string password)
        {
            return new Deliverer()
            {
                Id = Guid.NewGuid(),
                Email = email,
                Password = password,
            };
        }
    }
}
