using CateringBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace CateringBackend.Domain.Data
{
    public class CateringDbContext : DbContext
    {
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Deliverer> Deliverers { get; set; }
        public DbSet<Diet> Diets { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Producer> Producers { get; set; }

        private bool _disposed = false;


        public CateringDbContext(DbContextOptions<CateringDbContext> options) : base(options)
        {
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")?.ToLower() == "development")
                Database.Migrate();
            Database.OpenConnection();
        }

        public override void Dispose()
        {
            if (!_disposed)
            {
                Database.CloseConnection();
            }
            _disposed = true;
            base.Dispose();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new Configuration.AddressesConfiguration());
            builder.ApplyConfiguration(new Configuration.ClientsConfiguration());
            builder.ApplyConfiguration(new Configuration.ComplaintsConfiguration());
            builder.ApplyConfiguration(new Configuration.DeliverersConfiguration());
            builder.ApplyConfiguration(new Configuration.DietsConfiguration());
            builder.ApplyConfiguration(new Configuration.MealsConfiguration());
            builder.ApplyConfiguration(new Configuration.OrdersConfiguration());
            builder.ApplyConfiguration(new Configuration.ProducersConfiguration());
        }
    }
}
