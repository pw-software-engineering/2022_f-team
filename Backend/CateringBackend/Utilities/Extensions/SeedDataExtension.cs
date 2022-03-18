using CateringBackend.Domain.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace CateringBackend.Utilities.Extensions
{
    public static class SeedDataExtension
    {
        public static void SeedConfigData(this IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope();
            using var context = serviceScope.ServiceProvider.GetService<CateringDbContext>();
            var configDataSeeder = serviceScope.ServiceProvider.GetService<IConfigDataSeeder>();
            if (configDataSeeder == null)
                throw new Exception("ConfigDataSeeder not found");
            configDataSeeder.SeedConfigData();
        }
    }
}
