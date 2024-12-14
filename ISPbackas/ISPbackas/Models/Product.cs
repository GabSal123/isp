using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class Product
{
    public ulong Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int AvailableQuantity { get; set; }

    public double Price { get; set; }

    public double? Score { get; set; }

    public string? Brand { get; set; }

    public string? MadeInCountry { get; set; }
}
