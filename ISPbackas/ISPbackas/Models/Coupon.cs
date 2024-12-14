using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class Coupon
{
    public ulong Id { get; set; }

    public double PriceValue { get; set; }

    public string BuyerUsername { get; set; } = null!;

    public int FkPurchase { get; set; }

    public int FkRegisteredUser { get; set; }

    public int FkShoppingCart { get; set; }
}
