using System;
using System.Collections.Generic;

namespace ISPbackas.Models;

public partial class RegisteredUser
{
    public ulong Id { get; set; }

    public string Username { get; set; } = null!;
    public string Password {get; set;} = null!;

    public string Name { get; set; } = null!;

    public string Surname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? ProfilePicture { get; set; }

    public int Age { get; set; }

    public double LoyaltyMoney { get; set; }

    public int? Gender { get; set; }

    public int Level { get; set; }

    public int UserType { get; set; }
    public string? VerificationToken {get; set;}
    public int Verified {get;set;}

}


        