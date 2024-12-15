using Microsoft.AspNetCore.Mvc;
using ISPbackas.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq;
using Stripe;
using System.Threading.Tasks;

namespace ISPbackas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IspContext _context;
        private readonly StripePaymentService _stripeService;

        public ReservationController(IspContext context, StripePaymentService stripeService)
        {
            _context = context;
            _stripeService = stripeService; ;
        }

        [HttpPost]
        [Route("/ChangeCartStats")]
        public async Task<IActionResult> ChangeCartStats(int shoppingCartId, double price,string holder,string digits, int userId) {
            ShoppingCart sc = await _context.ShoppingCarts.FirstOrDefaultAsync(x => (int)x.Id == shoppingCartId && x.State == 1);
            if (sc == null)
            {
                return NotFound(new { message = "Shopping cart not found" });
            }


            sc.State = 4;
 
            Purchase purchase = new Purchase();
            purchase.Bank = "Swed";
            purchase.PriceValue = price;
            purchase.FkShoppingCart = shoppingCartId;
            purchase.CardInfo = holder + " " + digits;
            purchase.Date = DateTime.Today;
            purchase.FkRegisteredUser = userId;
            purchase.DayTimeSeconds = 0;
            _context.Purchases.Add(purchase);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("/CreatePaymentIntent")]
        public async Task<IActionResult> CreatePaymentIntent(int shoppingCartId)
        {
            var tickets = await _context.MovieTickets.Where(x => x.FkShoppingCart == shoppingCartId).ToListAsync();
            var productsIncluded = await _context.IncludedProducts.Where(x => x.FkShoppingCart == shoppingCartId).Select(x => new { x.Amount,x.FkProduct}).ToListAsync();
            var prods = await _context.Products.ToListAsync();

            double totalPrice = 0;
            foreach (var productInc in productsIncluded)
            {
                foreach (var product in prods) 
                {
                    if (productInc.FkProduct == (int)product.Id) 
                    {
                        totalPrice += product.Price * productInc.Amount;
                    }
                }
            }
            foreach (var ticket in tickets)
            {
                totalPrice += ticket.Price;
            }

            long amountInCents = (long)(totalPrice * 100); 

            var paymentIntent = await _stripeService.CreatePaymentIntentAsync(amountInCents);

            return Ok(new { clientSecret = paymentIntent });
        }


        [HttpGet]
        [Route("/GetPrice")]
        public async Task<IActionResult> GetPrice(int shoppingCartId)
        {
            var tickets = await _context.MovieTickets.Where(x => x.FkShoppingCart == shoppingCartId).ToListAsync();
            var productsIncluded = await _context.IncludedProducts.Where(x => x.FkShoppingCart == shoppingCartId).Select(x => new { x.Amount, x.FkProduct }).ToListAsync();
            var prods = await _context.Products.ToListAsync();

            double totalPrice = 0;
            foreach (var productInc in productsIncluded)
            {
                foreach (var product in prods)
                {
                    if (productInc.FkProduct == (int)product.Id)
                    {
                        totalPrice += product.Price * productInc.Amount;
                    }
                }
            }
            foreach (var ticket in tickets)
            {
                totalPrice += ticket.Price;
            }


            return Ok(totalPrice );
        }

        [HttpPost]
        [Route("/ConfirmPayment")]
        public async Task<IActionResult> ConfirmPayment(string paymentIntentId, string paymentMethodId)
        {
            try
            {

                var paymentIntent = await _stripeService.ConfirmPaymentIntent(paymentIntentId, paymentMethodId);


                if (paymentIntent.Status == "succeeded")
                {


                    return Ok(new { success = true, message = "Payment succeeded!" });
                }
                else
                {
                    return BadRequest(new { success = false, message = "Payment failed!" });
                }
            }
            catch (StripeException ex)
            {
                return BadRequest(new { success = false, message = ex.Message });
            }
        }


        private double CalculatePrice(Hall hall) 
        {
            if (hall == null) {
                return 0;
            }
            if (hall.Functionality == 1) {
                return 11;
            }
            if (hall.Functionality == 2) {
                return 25;
            }
            if (hall.Functionality == 3) {
                return 7;
            }
            return 0;
        }

        [HttpPost]
        [Route("/AddMovie")]
        public async Task<IActionResult> AddMovie(Movie movie)
        {
            if (movie == null)
            {
                return BadRequest("Movie data is required.");
            }

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return Ok(movie);
        }

        [HttpGet]
        [Route("/GetDates")]
        public async Task<IActionResult> GetDates(int id)
        {
            var allSessions = await _context.MovieSessions.Where(x=>(int)x.FkMovie == id).ToListAsync();

            if (allSessions is null) {
                return NotFound("No sessions this day");
            }

            var sessionTimes = allSessions.Select(x => new
            {
                Day = x.Day.ToString("yyyy-MM-dd")
            }).ToList();

            return Ok(sessionTimes);
        }

        [HttpGet]
        [Route("/GetTimes")]
        public async Task<IActionResult> GetTimes(int id, DateTime date)
        {
            Console.WriteLine(date.ToString());
            var allSessions = await _context.MovieSessions.Where(x => (int)x.FkMovie == id && x.Day == date).ToListAsync();

            if (allSessions is null || !allSessions.Any())
            {
                return NotFound("No sessions this day");
            }

            Movie movie = await _context.Movies.FirstOrDefaultAsync(movie => (int)movie.Id == id);
            MovieLanguage lang = await _context.MovieLanguages.FirstOrDefaultAsync(x => (int)x.Id == movie.Language);

            if (movie is null || lang is null)
            {
                return NotFound($"Movie not found with id = {id} or language");
            }

            var hallIds = allSessions.Select(s => s.FkHall).Distinct().ToList();
            var halls = await _context.Halls.Where(h => hallIds.Contains((int)h.Id)).ToListAsync();
            if (halls == null || !halls.Any())
            {
                return NotFound("Halls not found for the sessions.");
            }

            var hallMap = halls.ToDictionary(h => (int)h.Id, h => h);

            var times = allSessions.Select(session =>
            {
                Hall hall = hallMap.ContainsKey(session.FkHall) ? hallMap[session.FkHall] : null;

                double price = CalculatePrice(hall);
                Functionality func = _context.Functionalities.FirstOrDefault(x => (int)x.Id == hall.Functionality);
                return new
                {
                    id = session.Id,
                    subs = movie.Subtitles ? "LT subs" : "Nera subtitru",
                    time = session.StartTime,
                    language = lang.Name,
                    hall = hall.Id,
                    func = func.Name,
                    price = price
                };
            }).ToList();

            return Ok(times);
        }


        [HttpGet]
        [Route("/GetMovieFromSession")]
        public async Task<IActionResult> GetMovieFromSession(int sessionId)
        {
            MovieSession ms = await _context.MovieSessions.FirstOrDefaultAsync(x => (int)x.Id == sessionId);
            if (ms is null)
            {
                return NotFound("No movie session found");
            }

            Movie movie = await _context.Movies.FirstOrDefaultAsync(movie => (int)movie.Id == ms.FkMovie);

            if (movie is null)
            {
                return NotFound($"Movie not found with id = {movie.Id}");
            }

            return Ok(movie);
        }

        [HttpGet]
        [Route("/GetMovie")]
        public async Task<IActionResult> GetMovie(int id)
        {
            Movie movie = await _context.Movies.FirstOrDefaultAsync(movie=>(int)movie.Id == id);

            if (movie is null)
            {
                return NotFound($"Movie not found with id = {id}");
            }

            return Ok(movie);
        }


        [HttpGet]
        [Route("/GetAvailableSeats")]
        public async Task<IActionResult> GetAvailableSeats(int sessionId)
        {
            MovieSession ms = await _context.MovieSessions.FirstOrDefaultAsync(x => (int)x.Id == sessionId);
            if (ms is null)
            {
                return NotFound($"Movie Session not found with id = {sessionId}");
            }

            Hall hall = await _context.Halls.FirstOrDefaultAsync(x => (int)x.Id == ms.FkHall);
            if (hall is null) 
            {
                return NotFound("Hall not found");
            }

            double price = CalculatePrice(hall);

            var tickets = await _context.MovieTickets.Where(x => x.FkMovieSession == sessionId).ToListAsync();

            if (tickets.Count() == 0)
            {
                var obj = new {hall.number_of_rows, hall.number_of_columns, price };
                return Ok(obj);
            }
            else 
            {
                var takenSeats = tickets.Select(x => new {x.Row, x.Seat, x.FkShoppingCart });
                var obj = new { takenSeats, hall.number_of_rows, hall.number_of_columns, price };
                return Ok(obj);
            }
        }


        [HttpGet]
        [Route("/CheckShoppingCart")]
        public async Task<IActionResult> CheckShoppingCart(int userId)
        {
            ShoppingCart sc = await _context.ShoppingCarts.FirstOrDefaultAsync(x=>x.FkRegisteredUser == userId && x.State == 1);
            if (sc is null)
            {
                return Ok(-1);
            }
            else
            {
                return Ok(sc.Id);
            }
        }


        [HttpPost]
        [Route("/CreateShoppingCart")]
        public async Task<IActionResult> CreateShoppingCart(ShoppingCart shoppingCart)
        {
            if (shoppingCart == null)
            {
                return BadRequest("shopping cart data is required.");
            }

            _context.ShoppingCarts.Add(shoppingCart);
            await _context.SaveChangesAsync();

            return Ok(shoppingCart.Id);
        }


        [HttpPost]
        [Route("/AddReservation")]
        public async Task<IActionResult> AddReservation(MovieTicket ticket)
        {
            if (ticket == null)
            {
                return BadRequest("ticket data is required.");
            }

            _context.MovieTickets.Add(ticket);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("/GetReservations")]
        public async Task<IActionResult> GetReservations(int userId)
        {
            ShoppingCart sc = await _context.ShoppingCarts.FirstOrDefaultAsync(x => x.FkRegisteredUser == userId && x.State == 1);
            if (sc is null)
            {
                return Ok(-1);
            }
            else
            {
                var ticketsWithDetails = await _context.MovieTickets
                    .Where(ticket => ticket.FkShoppingCart == (int)sc.Id)
                    .Join(_context.MovieSessions,
                        ticket => ticket.FkMovieSession,
                        session => (int)session.Id,
                        (ticket, session) => new
                        {
                            ticket.Price,
                            session.Id,
                            session.Day,
                            session.FkMovie
                        })
                    .Join(_context.Movies,
                        session => session.FkMovie,
                        movie => (int)movie.Id,
                        (session, movie) => new
                        {
                            session.Id,
                            session.Day,
                            session.Price,
                            MovieTitle = movie.Title
                        })
                    .ToListAsync();

                var result = ticketsWithDetails
                    .GroupBy(ticket => ticket.Id)
                    .Select(group => new
                    {
                        MovieSessionId = group.Key,
                        TotalPrice = group.Sum(ticket => ticket.Price),
                        MovieTitle = group.First().MovieTitle,
                        Day = group.First().Day
                    })
                    .ToList();

                return Ok(result);
            }
        }

        [HttpPost]
        [Route("/ChangeReservation")]
        public async Task<IActionResult> ChangeReservation(MovieTicket ticket, bool selected)
        {
            if (ticket == null)
            {
                return BadRequest("ticket data is required.");
            }
            MovieTicket found = await _context.MovieTickets
                .FirstOrDefaultAsync(x => x.FkMovieSession == ticket.FkMovieSession && x.Row == ticket.Row && x.Seat == ticket.Seat);
            if (selected && found is null)
            {
                _context.MovieTickets.Add(ticket);
                await _context.SaveChangesAsync();
                return Ok("added");
            }
            else if (!selected && found is not null) {
                _context.MovieTickets.Remove(found);
                await _context.SaveChangesAsync();
                return Ok("removed");
            }


            return Ok("not changed");
        }

        [HttpDelete]
        [Route("/DeleteReservation")]
        public async Task<IActionResult> DeleteReservation(int shoppingCartId,int sessionId)
        {
            ShoppingCart sc = await _context.ShoppingCarts.FirstOrDefaultAsync(x => (int)x.Id == shoppingCartId);
            if (sc is null)
            {
                return NotFound();
            }
            var ticketsToRemove = await _context.MovieTickets.Where(x => x.FkShoppingCart == shoppingCartId && x.FkMovieSession == sessionId).ToListAsync();
            _context.MovieTickets.RemoveRange(ticketsToRemove);
            await _context.SaveChangesAsync();
            return Ok();

        }

        [HttpGet]
        [Route("/GetReservationInfo")]
        public async Task<IActionResult> GetReservationInfo(int cartId, int sessionId) {
            var tickets = await _context.MovieTickets.Where(x => x.FkMovieSession == sessionId && x.FkShoppingCart == cartId).ToListAsync();


            return Ok(tickets);
        }

        [HttpGet]
        [Route("/GetAllMovies")]
        public async Task<IActionResult> GetAllMovies()
        {
            var movies = await _context.Movies.ToListAsync();


            return Ok(movies);
        }

    }
}




