using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class Purchase
{
    public ulong Id { get; set; }

    public string Bank { get; set; } = null!;

    public string CardInfo { get; set; } = null!;

    public double PriceValue { get; set; }

    public DateOnly Date { get; set; }

    public int DayTimeSeconds { get; set; }

    public int FkShoppingCart { get; set; }

    public int FkRegisteredUser { get; set; }
}
