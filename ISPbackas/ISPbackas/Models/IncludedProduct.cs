using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class IncludedProduct
{
    public ulong Id { get; set; }

    public int Amount { get; set; }

    public int FkShoppingCart { get; set; }

    public int FkProduct { get; set; }
}
