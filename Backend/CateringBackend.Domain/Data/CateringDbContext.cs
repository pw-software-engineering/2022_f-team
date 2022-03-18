using CateringBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CateringBackend.Domain.Data
{
    public class CateringDbContext : DbContext
    {
        private bool _disposed = false;
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Complaint> Complaints { get; set; }
        public DbSet<Deliverer> Deliverers { get; set; }
        public DbSet<Diet> Diets { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Producer> Producers { get; set; }

        public CateringDbContext(DbContextOptions<CateringDbContext> options) : base(options)
        {
            ConfigureSqlDatabase();
        }

        protected void ConfigureSqlDatabase()
        {
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")?.ToLower() == "development")
                Database.Migrate();
            Database.OpenConnection();
        }

        protected void DisposeSqlDatabase()
        {
            if (!_disposed)
            {
                Database.CloseConnection();
            }
        }

        public override void Dispose()
        {
            DisposeSqlDatabase();
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
        public override int SaveChanges()
        {
            return base.SaveChanges();
        }
    }
}
