using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class AppliedDiscount
{
    public ulong Id { get; set; }

    public double Percentage { get; set; }

    public int FkShoppingCart { get; set; }

    public int FkRegisteredClient { get; set; }

    public int FkPurchase { get; set; }
}
