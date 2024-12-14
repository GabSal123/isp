using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class Movie
{
    public ulong Id { get; set; }

    public string Title { get; set; } = null!;

    public DateOnly? StartingFrom { get; set; }

    public DateOnly? ShowingUntil { get; set; }

    public string Cover { get; set; } = null!;

    public bool IsDubbed { get; set; }

    public bool Subtitles { get; set; }

    public string Description { get; set; } = null!;

    public string? TrailerLink { get; set; }

    public int Duration { get; set; }

    public string Studio { get; set; } = null!;

    public int Language { get; set; }

    public int AgeCensorship { get; set; }
}
