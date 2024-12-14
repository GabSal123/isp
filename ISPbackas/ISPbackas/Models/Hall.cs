using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class Hall
{
    public ulong Id { get; set; }

    public int TotalSeatCount { get; set; }

    public int AvailableSeatCount { get; set; }

    public int Functionality { get; set; }
}
