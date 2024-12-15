using Microsoft.AspNetCore.Mvc;
using ISPbackas.Models;
using Microsoft.EntityFrameworkCore;
using ISPbackas.Services;

namespace ISPbackas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IspContext _context;
        private readonly EmailService _emailService;

        public UserController(IspContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }


        [HttpPost]
        [Route("/TestCoupon")]
        public async Task<IActionResult> TestCoupon(Coupon coupon)
        {
            if(coupon == null)
            {
                return BadRequest("Kuponų informacija nerasta");
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
                return BadRequest("Vartotojo informacija nerasta/neteisinga");
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
                return NotFound($"Vartotojas su id: {id} nėra užsiregistravęs");   
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
                return BadRequest("Vartotojas nerastas");
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
                return NotFound("Peržiūrėti filmai nerasti");
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
                return NotFound("Filmai nerasti");
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
                return NotFound("Pirkiniai nerasti");
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
                return NotFound("Vartotojas nerastas");
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
                return NotFound("Kuponai nerasti");
            }

            return Ok(coupons);
        }

        [HttpPut]
        [Route("/UpdateUserCredit")]
        public async Task<IActionResult> UpdateUserCredit(int id)
        {
            var user =  _context.RegisteredUsers.FirstOrDefault(u => u.Id == (ulong)id );

            if(user == null)
            {
                return NotFound("Vartotojas nerastas");
            }
            var purchases = await _context.Purchases.Where(u => u.FkRegisteredUser == id).ToListAsync();
            if(purchases == null || !purchases.Any())
            {
                return NotFound("Pirkiniai nerasti");
            }
            double totalSpent = 0;
            foreach(var purchase in purchases)
            {
                totalSpent += purchase.PriceValue;
            }
            double appliedDiscount = 0;
            if (totalSpent < 100) {
                appliedDiscount = 0;
            } else if (totalSpent >= 100 && totalSpent < 250) {
                appliedDiscount = 3;
            } else if (totalSpent >= 250 && totalSpent < 500) {
                appliedDiscount = 5;
            } else if (totalSpent >= 500) {
                appliedDiscount = 10;
            }

            user.LoyaltyMoney = appliedDiscount;
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPut]
        [Route("/UpdateUserCredentials")]
        public async Task<IActionResult> UpdateUserCredentials(int id, string name, string surname, string username,
        string password, string email, int age, int gender)
        {
            var user =  _context.RegisteredUsers.FirstOrDefault(u => u.Id == (ulong)id );

            if(user == null)
            {
                return NotFound("Vartotojas nerastas");
            }

            user.Name = name;
            user.Surname = surname;
            user.Username = username;
            user.Password = password;
            user.Email = email;
            user.Age = age;
            user.Gender = gender;

            await _context.SaveChangesAsync();
            return Ok(user);
        }
        
        [HttpGet]
        [Route("/GetCouponsCount")]
        public async Task<IActionResult> GetCouponsCount(int id)
        {
            var coupons = await _context.Coupons.Where(u => u.FkRegisteredUser == id).ToListAsync();
            int couponCount = coupons?.Count() ?? 0; 

            if (couponCount == 0)
            {
                return Ok(new { message = "Nerasti kuponai", couponCount });
            }
                

            return Ok(couponCount);
        }
        [HttpPost]
        [Route("/SendEmail")]
        public async Task<IActionResult> SendEmail([FromBody] string recipientEmail)
        {
            await _emailService.SendEmailAsync(recipientEmail, "Test", "test2");
         

            return Ok("Paštas išsiūstas sėkmingai");
        }
        [HttpPost]
        [Route("/SendVerificationEmail")]
        public async Task<IActionResult> SendVerificationEmail([FromBody] string recipientEmail)
        {
            var user = await _context.RegisteredUsers.FirstOrDefaultAsync(u => u.Email == recipientEmail);
            if (user == null)
            {
                return NotFound("Vartotojas nerastas");
            }
            var token = Guid.NewGuid().ToString();

            user.VerificationToken = token;
            user.Verified = 0;       
            await _context.SaveChangesAsync();

            var verificationLink = $"https://localhost:7241/VerifyEmail?token={token}";
            await _emailService.SendEmailAsync(recipientEmail, "Email Verification",
            $"Patvirtinkite savo paštą paspausdami <a href=\"{verificationLink}\">šią nuorodą</a>");

            return Ok("Patvirtinimo laiškas išsiūstas");
        
        }
        [HttpGet]
        [Route("/VerifyEmail")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string token)
        {
            var user = await _context.RegisteredUsers.FirstOrDefaultAsync(u => u.VerificationToken == token);

            if (user == null)
                return BadRequest("Invalid token");

            user.Verified = 1;
            user.VerificationToken = null; 
            
            await _context.SaveChangesAsync();

            return Ok("El. paštas patvirtinas sėkmingai");
        }

        [HttpPost]
        [Route("/SendLoginEmail")]
        public async Task<IActionResult> SendLoginEmail([FromBody] string recipientEmail)
        {
            var user = await _context.RegisteredUsers.FirstOrDefaultAsync(u => u.Email == recipientEmail);
            if (user == null)
            {
                return NotFound("Vartotojas nerastas");
            }
            var token = Guid.NewGuid().ToString();

            user.VerificationToken = token;
            user.isloggedin = 0;       
            await _context.SaveChangesAsync();

            var verificationLink = $"https://localhost:7241/VerifyLogin?token={token}";
            await _emailService.SendEmailAsync(recipientEmail, "Login Verification",
            $"Patvirtinkite savo prisijungimą paspausdami <a href=\"{verificationLink}\">šią nuorodą</a>");

            return Ok("Prisijungimo patvirtinimo laiškas išsiūstas");
        
        }

        [HttpGet]
        [Route("/VerifyLogin")]
        public async Task<IActionResult> VerifyLogin([FromQuery] string token)
        {
            var user = await _context.RegisteredUsers.FirstOrDefaultAsync(u => u.VerificationToken == token);

            if (user == null)
                return BadRequest("Invalid token");

            user.isloggedin = 1;
            user.VerificationToken = null; 
            
            await _context.SaveChangesAsync();

            return Ok("Prisijungimas buvo patvirtintas");
        }
        [HttpPut]
        [Route("/UpdateLoginStatus")]
        public async Task<IActionResult> UpdateLoginStatus(int id)
        {
            var user =  _context.RegisteredUsers.FirstOrDefault(u => u.Id == (ulong)id );

            if(user == null)
            {
                return NotFound("Vartotojas nerastas");
            }

            user.isloggedin = 0;
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        

       
        
        

        
        
        
        


    }

        
    
}
