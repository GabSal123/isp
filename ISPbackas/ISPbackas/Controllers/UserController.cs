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
        public async Task<IActionResult> GetUser(string username, string password)
        {
            var user =  _context.RegisteredUsers.FirstOrDefault(u => u.Username == username && u.Password == password);
            await _context.SaveChangesAsync();

            if(user == null)
            {
                return NotFound($"User with Username {username} is not registered");   
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

    }
}
