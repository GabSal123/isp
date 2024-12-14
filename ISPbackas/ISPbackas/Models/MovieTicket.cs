using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class MovieTicket
{
    public ulong Id { get; set; }

    public double Price { get; set; }

    public int Row { get; set; }

    public int Seat { get; set; }

    public int FkMovieSession { get; set; }

    public int FkShoppingCart { get; set; }
}
