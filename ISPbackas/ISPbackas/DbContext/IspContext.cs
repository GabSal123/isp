using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ISPbackas.Models;

namespace ISPbackas.Models;

public partial class IspContext : DbContext
{
    public IspContext()
    {
    }

    public IspContext(DbContextOptions<IspContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AppliedDiscount> AppliedDiscounts { get; set; }

    public virtual DbSet<Coupon> Coupons { get; set; }

    public virtual DbSet<Functionality> Functionalities { get; set; }

    public virtual DbSet<Gender> Genders { get; set; }

    public virtual DbSet<Hall> Halls { get; set; }

    public virtual DbSet<IncludedProduct> IncludedProducts { get; set; }

    public virtual DbSet<Level> Levels { get; set; }

    public virtual DbSet<Movie> Movies { get; set; }

    public virtual DbSet<MovieAgeCensorship> MovieAgeCensorships { get; set; }

    public virtual DbSet<MovieLanguage> MovieLanguages { get; set; }

    public virtual DbSet<MovieRating> MovieRatings { get; set; }

    public virtual DbSet<MovieSession> MovieSessions { get; set; }

    public virtual DbSet<MovieTicket> MovieTickets { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Purchase> Purchases { get; set; }

    public virtual DbSet<RegisteredUser> RegisteredUsers { get; set; }

    public virtual DbSet<ShoppingCart> ShoppingCarts { get; set; }

    public virtual DbSet<ShoppingCartState> ShoppingCartStates { get; set; }

    public virtual DbSet<UserType> UserTypes { get; set; }

    public virtual DbSet<WatchedMovie> WatchedMovies { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3307;database=isp;user=root", Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.32-mariadb"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("latin1_swedish_ci")
            .HasCharSet("latin1");

        modelBuilder.Entity<AppliedDiscount>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("applied_discount");

            entity.HasIndex(e => e.FkPurchase, "fk_PURCHASE").IsUnique();

            entity.HasIndex(e => e.FkRegisteredClient, "fk_REGISTERED_CLIENT").IsUnique();

            entity.HasIndex(e => e.FkShoppingCart, "fk_SHOPPING_CART").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.FkPurchase)
                .HasColumnType("int(11)")
                .HasColumnName("fk_PURCHASE");
            entity.Property(e => e.FkRegisteredClient)
                .HasColumnType("int(11)")
                .HasColumnName("fk_REGISTERED_CLIENT");
            entity.Property(e => e.FkShoppingCart)
                .HasColumnType("int(11)")
                .HasColumnName("fk_SHOPPING_CART");
            entity.Property(e => e.Percentage).HasColumnName("percentage");
        });

        modelBuilder.Entity<Coupon>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("coupon");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.BuyerUsername)
                .HasMaxLength(255)
                .HasColumnName("buyer_username");
            entity.Property(e => e.FkPurchase)
                .HasColumnType("int(11)")
                .HasColumnName("fk_PURCHASE");
            entity.Property(e => e.FkRegisteredUser)
                .HasColumnType("int(11)")
                .HasColumnName("fk_REGISTERED_USER");
            entity.Property(e => e.FkShoppingCart)
                .HasColumnType("int(11)")
                .HasColumnName("fk_SHOPPING_CART");
            entity.Property(e => e.PriceValue).HasColumnName("price_value");
        });

        modelBuilder.Entity<Functionality>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("functionality");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Gender>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("gender");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Hall>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("hall");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.AvailableSeatCount)
                .HasColumnType("int(11)")
                .HasColumnName("available_seat_count");
            entity.Property(e => e.Functionality)
                .HasColumnType("int(11)")
                .HasColumnName("functionality");
            entity.Property(e => e.TotalSeatCount)
                .HasColumnType("int(11)")
                .HasColumnName("total_seat_count");
        });

        modelBuilder.Entity<IncludedProduct>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("included_product");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Amount)
                .HasColumnType("int(11)")
                .HasColumnName("amount");
            entity.Property(e => e.FkProduct)
                .HasColumnType("int(11)")
                .HasColumnName("fk_PRODUCT");
            entity.Property(e => e.FkShoppingCart)
                .HasColumnType("int(11)")
                .HasColumnName("fk_SHOPPING_CART");
        });

        modelBuilder.Entity<Level>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("level");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("movie");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.AgeCensorship)
                .HasColumnType("int(11)")
                .HasColumnName("age_censorship");
            entity.Property(e => e.Cover)
                .HasMaxLength(255)
                .HasColumnName("cover");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Duration)
                .HasColumnType("int(11)")
                .HasColumnName("duration");
            entity.Property(e => e.IsDubbed).HasColumnName("is_dubbed");
            entity.Property(e => e.Language)
                .HasColumnType("int(11)")
                .HasColumnName("language");
            entity.Property(e => e.ShowingUntil).HasColumnName("showing_until");
            entity.Property(e => e.StartingFrom).HasColumnName("starting_from");
            entity.Property(e => e.Studio)
                .HasMaxLength(255)
                .HasColumnName("studio");
            entity.Property(e => e.Subtitles).HasColumnName("subtitles");
            entity.Property(e => e.Title)
                .HasMaxLength(255)
                .HasColumnName("title");
            entity.Property(e => e.TrailerLink)
                .HasMaxLength(255)
                .HasColumnName("trailer_link");
        });

        modelBuilder.Entity<MovieAgeCensorship>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("movie_age_censorship");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<MovieLanguage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("movie_language");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<MovieRating>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("movie_rating");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<MovieSession>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("movie_session");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Day).HasColumnName("day");
            entity.Property(e => e.EndTime)
                .HasColumnType("int(11)")
                .HasColumnName("end_time");
            entity.Property(e => e.FkHall)
                .HasColumnType("int(11)")
                .HasColumnName("fk_HALL");
            entity.Property(e => e.FkMovie)
                .HasColumnType("int(11)")
                .HasColumnName("fk_MOVIE");
            entity.Property(e => e.StartTime)
                .HasColumnType("int(11)")
                .HasColumnName("start_time");
        });

        modelBuilder.Entity<MovieTicket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("movie_ticket");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.FkMovieSession)
                .HasColumnType("int(11)")
                .HasColumnName("fk_MOVIE_SESSION");
            entity.Property(e => e.FkShoppingCart)
                .HasColumnType("int(11)")
                .HasColumnName("fk_SHOPPING_CART");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Row)
                .HasColumnType("int(11)")
                .HasColumnName("row");
            entity.Property(e => e.Seat)
                .HasColumnType("int(11)")
                .HasColumnName("seat");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("product");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.AvailableQuantity)
                .HasColumnType("int(11)")
                .HasColumnName("available_quantity");
            entity.Property(e => e.Brand)
                .HasMaxLength(255)
                .HasColumnName("brand");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.MadeInCountry)
                .HasMaxLength(255)
                .HasColumnName("made_in_country");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Score).HasColumnName("score");
        });

        modelBuilder.Entity<Purchase>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("purchase");

            entity.HasIndex(e => e.FkShoppingCart, "fk_SHOPPING_CART").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Bank)
                .HasMaxLength(255)
                .HasColumnName("bank");
            entity.Property(e => e.CardInfo)
                .HasMaxLength(255)
                .HasColumnName("card_info");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.DayTimeSeconds)
                .HasColumnType("int(11)")
                .HasColumnName("day_time_seconds");
            entity.Property(e => e.FkRegisteredUser)
                .HasColumnType("int(11)")
                .HasColumnName("fk_REGISTERED_USER");
            entity.Property(e => e.FkShoppingCart)
                .HasColumnType("int(11)")
                .HasColumnName("fk_SHOPPING_CART");
            entity.Property(e => e.PriceValue).HasColumnName("price_value");
        });

        modelBuilder.Entity<RegisteredUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("registered_user");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Age)
                .HasColumnType("int(11)")
                .HasColumnName("age");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Gender)
                .HasColumnType("int(11)")
                .HasColumnName("gender");
            entity.Property(e => e.Level)
                .HasColumnType("int(11)")
                .HasColumnName("level");
            entity.Property(e => e.LoyaltyMoney).HasColumnName("loyalty_money");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.ProfilePicture)
                .HasMaxLength(255)
                .HasColumnName("profile_picture");
            entity.Property(e => e.Surname)
                .HasMaxLength(255)
                .HasColumnName("surname");
            entity.Property(e => e.UserType)
                .HasColumnType("int(11)")
                .HasColumnName("user_type");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");
        });

        modelBuilder.Entity<ShoppingCart>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("shopping_cart");

            entity.HasIndex(e => e.FkRegisteredUser, "fk_REGISTERED_USER").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.CreationDate).HasColumnName("creation_date");
            entity.Property(e => e.CreationTime)
                .HasColumnType("int(11)")
                .HasColumnName("creation_time");
            entity.Property(e => e.FkRegisteredUser)
                .HasColumnType("int(11)")
                .HasColumnName("fk_REGISTERED_USER");
            entity.Property(e => e.State)
                .HasColumnType("int(11)")
                .HasColumnName("state");
        });

        modelBuilder.Entity<ShoppingCartState>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("shopping_cart_state");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<UserType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user_type");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
        });

        modelBuilder.Entity<WatchedMovie>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("watched_movie");

            entity.Property(e => e.Id)
                .HasColumnType("bigint(20) unsigned")
                .HasColumnName("id");
            entity.Property(e => e.Comment)
                .HasMaxLength(255)
                .HasColumnName("comment");
            entity.Property(e => e.FkMovie)
                .HasColumnType("int(11)")
                .HasColumnName("fk_MOVIE");
            entity.Property(e => e.FkRegisteredUser)
                .HasColumnType("int(11)")
                .HasColumnName("fk_REGISTERED_USER");
            entity.Property(e => e.Rating)
                .HasColumnType("int(11)")
                .HasColumnName("rating");
            entity.Property(e => e.WatchDate).HasColumnName("watch_date");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
