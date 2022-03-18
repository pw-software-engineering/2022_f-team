using System;
using System.Collections.Generic;

namespace CateringBackend.Domain.Entities
{
    public class Diet
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
        public HashSet<Meal> Meals { get; set; }

        protected Diet()
        {
            Meals = new HashSet<Meal>();
        }

        public static Diet Create(string title, string description, decimal price, IEnumerable<Meal> meals = null)
        {
            var diet = new Diet()
            {
                Title = title,
                Description = description,
                Price = price,
                IsAvailable = true
            };
            if (meals != null)
                diet.Meals = new HashSet<Meal>(meals);

            return diet;
        }

        public void Delete()
        {
            IsAvailable = false;
        }
    }
}
