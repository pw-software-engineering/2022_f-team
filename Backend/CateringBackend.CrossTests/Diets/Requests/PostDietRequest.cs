﻿using System;
using System.Collections.Generic;
using System.Text;

namespace CateringBackend.CrossTests.Diets.Requests
{
    public class PostDietRequest
    {
        public string Name { get; set; }
        public string[] MealIds { get; set; }
        public decimal Price { get; set; }
    }
}
