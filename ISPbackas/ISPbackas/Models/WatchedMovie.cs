using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class WatchedMovie
{
    public ulong Id { get; set; }

    public DateOnly WatchDate { get; set; }

    public string? Comment { get; set; }

    public int Rating { get; set; }

    public int FkMovie { get; set; }

    public int FkRegisteredUser { get; set; }
}
