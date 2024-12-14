using Microsoft.AspNetCore.Mvc;
using ISPbackas.Models;
using Microsoft.EntityFrameworkCore;

namespace ISPbackas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IspContext _context;

        public ReservationController(IspContext context)
        {
            _context = context;
        }


        [HttpPost]
        [Route("/Test")]
        public async Task<IActionResult> Test(Movie movie)
        {
            if (movie == null)
            {
                return BadRequest("Movie data is required.");
            }

            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();

            return Ok(movie);
        }
    }
}
