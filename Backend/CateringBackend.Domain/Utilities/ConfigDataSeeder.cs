using CateringBackend.Domain.Data;
using CateringBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CateringBackend.Domain.Utilities
{
    public class ConfigDataSeeder
    {
        private readonly CateringDbContext _context;

        public ConfigDataSeeder(CateringDbContext context)
        {
            _context = context;
        }

        public void SeedConfigData()
        {
            SeedData(_context.Addresses, GetAddresses());
            SeedData(_context.Meals, GetMeals());
            _context.SaveChanges();

            SeedData(_context.Clients, GetClients(_context.Addresses));
            SeedData(_context.Deliverers, GetDeliverers());
            SeedData(_context.Diets, GetDiets(_context.Meals));
            SeedData(_context.Producers, GetProducers());
            _context.SaveChanges();
        }

        private void SeedData<T>(DbSet<T> set, IEnumerable<T> data)
            where T : class
        {
            if (!set.Any())
                set.AddRange(data);
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
