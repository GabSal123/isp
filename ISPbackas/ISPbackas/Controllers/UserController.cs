using Microsoft.AspNetCore.Mvc;
using ISPbackas.Models;
using Microsoft.EntityFrameworkCore;

namespace ISPbackas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IspContext _context;

        public UserController(IspContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("/TestCoupon")]
        public async Task<IActionResult> TestCoupon(Coupon coupon)
        {
            if(coupon == null)
            {
                return BadRequest("Coupon data is required.");
            }

            _context.Coupons.Add(coupon);
            await _context.SaveChangesAsync();

            return Ok(coupon);
            
        }

        [HttpPost]
        [Route("/AddUser")]
        public async Task<IActionResult> AddUser(RegisteredUser registeredUser)
        {
            if(registeredUser == null)
            {
                return BadRequest("RegisteredUser data is required.");
            }

            _context.RegisteredUsers.Add(registeredUser);
            await _context.SaveChangesAsync();

            return Ok(registeredUser);
            
        }
        [HttpGet]
        [Route("/GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user =  _context.RegisteredUsers.FirstOrDefault(u => u.Id == (ulong)id );
            await _context.SaveChangesAsync();

            if(user == null)
            {
                return NotFound($"User with id: {id} is not registered");   
            }
            
            return Ok(user);

        }
        [HttpGet]
        [Route("/GetId")]
        public async Task<IActionResult> GetId(string username, string password)
        {
            var registeredUser = _context.RegisteredUsers.FirstOrDefault(u => u.Username == username && u.Password == password);

            if (registeredUser == null)
            {
                return BadRequest("User not found");
            }

            var id = registeredUser.Id;
            await _context.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet]
        [Route("/GetFilms")]
        public async Task<IActionResult> GetFilms(int id)
        {
            var films = await _context.WatchedMovies.Where(u => u.FkRegisteredUser == id).ToListAsync();

            if(films == null || !films.Any())
            {
                return NotFound("Film data not found");
            }

            return Ok(films);
        }
        [HttpGet]
        [Route("/GetMovie")]
        public async Task<IActionResult> GetMovie(int id)
        {
            var movies = await _context.Movies.Where(u => u.Id == (ulong)id).ToListAsync();

            if(movies == null || !movies.Any())
            {
                return NotFound("Movies data not found");
            }

            return Ok(movies);
        }
        [HttpGet]
        [Route("/GetPurchases")]
        public async Task<IActionResult> GetPurchases(int id)
        {
            var purchases = await _context.Purchases.Where(u => u.FkRegisteredUser == id).ToListAsync();

            if(purchases == null || !purchases.Any())
            {
                return NotFound("Purchases data not found");
            }

            return Ok(purchases);
        }
        [HttpPut]
        [Route("/UpdateLoyalty")]
        public async Task<IActionResult> UpdateLoyalty(int id, [FromBody] double loyaltyCredit)
        {
            var user =  _context.RegisteredUsers.FirstOrDefault(u => u.Id == (ulong)id );

            if(user == null)
            {
                return NotFound("User data not found");
            }

            user.LoyaltyMoney = loyaltyCredit;
            await _context.SaveChangesAsync();
            return Ok(user);
        }
        [HttpGet]
        [Route("/GetCoupons")]
        public async Task<IActionResult> GetCoupons(int id)
        {
            var coupons = await _context.Coupons.Where(u => u.FkRegisteredUser == id).ToListAsync();

            if(coupons == null || !coupons.Any())
            {
                return NotFound("Coupons data not found");
            }

            return Ok(coupons);
        }


    }

    
}
