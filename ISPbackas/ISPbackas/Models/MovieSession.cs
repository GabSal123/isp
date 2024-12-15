using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class MovieSession
{
    public ulong Id { get; set; }

    public DateTime Day { get; set; }

    public int StartTime { get; set; }

    public int EndTime { get; set; }

    public int FkHall { get; set; }

    public int FkMovie { get; set; }
}
