using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CateringBackend.Domain.Utilities
{
    public interface IConfigDataSeeder
    {
        void SeedConfigData();
    }

    public class ConfigDataSeeder : IConfigDataSeeder
    {
        private readonly CateringDbContext _context;

        public ConfigDataSeeder(CateringDbContext context)
        {
            _context = context;
        }

        public void SeedConfigData()
        {
            var updatedData = false;

            if (!_context.Addresses.Any())
            {
                _context.Addresses.AddRange(GetAddresses());
                updatedData = true;
            }
            if (!_context.Meals.Any())
            {
                _context.Meals.AddRange(GetMeals());
                updatedData = true;
            }

            _context.SaveChanges();

            if (!_context.Clients.Any())
            {
                _context.Clients.AddRange(GetClients(_context.Addresses));
                updatedData = true;
            }

            if (!_context.Deliverers.Any())
            {
                _context.Deliverers.AddRange(GetDeliverers());
                updatedData = true;
            }

            if (!_context.Diets.Any())
            {
                _context.Diets.AddRange(GetDiets(_context.Meals));
                updatedData = true;
            }

            if (!_context.Producers.Any())
            {
                _context.Producers.AddRange(GetProducers());
                updatedData = true;
            }

            if (!updatedData) return;

            _context.SaveChanges();
        }

        private IEnumerable<Producer> GetProducers()
        {
            yield return Producer.Create("producer@gmail.com", PasswordManager.Encrypt("producer123"));
        }

        private IEnumerable<Diet> GetDiets(IEnumerable<Meal> meals)
        {
            yield return Diet.Create("Dieta chicken", "super kurczak", 589, meals.Skip(2));
            yield return Diet.Create("Dieta mega chicken", "dużo kurczaka", 987, meals.SkipLast(2));
        }

        private IEnumerable<Meal> GetMeals()
        {
            yield return Meal.Create("Kurczak z ryżem", "kurczak, ryż", "kurczak", 589, false);
            yield return Meal.Create("Kurczak z kaszą", "kurczak, kasza", String.Empty, 290, false);
            yield return Meal.Create("Kurczak z niczym", "kurczak", "kurczak", 566, true);
            yield return Meal.Create("Kurczak z kurczakiem", "kurczak, kurczak", String.Empty, 109, true);
        }

        private IEnumerable<Deliverer> GetDeliverers()
        {
            yield return Deliverer.Create("deliverer@gmail.com", PasswordManager.Encrypt("deliverer123"));
        }

        private IEnumerable<Client> GetClients(IEnumerable<Address> addresses)
        {
            yield return Client.Create("client@gmail.com", PasswordManager.Encrypt("client123"), "Mr.", "Client", "123456789", addresses.First().Id);
        }

        private IEnumerable<Address> GetAddresses()
        {
            yield return Address.Create("Koszykowa", "98", "2a", "01-556", "Warszawa");
            yield return Address.Create("Hoża", "5", "1", "01-666", "Szczecin");
        }
    }
}
