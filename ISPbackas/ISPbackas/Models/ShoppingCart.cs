using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class ShoppingCart
{
    public ulong Id { get; set; }

    public DateOnly CreationDate { get; set; }

    public int CreationTime { get; set; }

    public int State { get; set; }

    public int FkRegisteredUser { get; set; }
}
