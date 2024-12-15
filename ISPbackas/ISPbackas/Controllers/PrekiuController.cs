using Microsoft.AspNetCore.Mvc;
using ISPbackas.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace ISPbackas.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IspContext _context;

        public ProductController(IspContext context)
        {
            _context = context;
        }

        // Get all products
        [HttpGet]
        [Route("/GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            if (products == null || !products.Any())
            {
                return NotFound("No products available.");
            }

            return Ok(products);
        }

        // Get a product by ID
        [HttpGet]
        [Route("/GetProduct/{id}")]
        public async Task<IActionResult> GetProduct(long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == (ulong)id);

            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            return Ok(product);
        }
             [HttpGet]
        [Route("/GetProductsByCategory")]
        public async Task<IActionResult> GetProductsByCategory(string category)
        {
            // Validate the input
            if (string.IsNullOrWhiteSpace(category))
            {
                return BadRequest("Category must be provided.");
            }

            // Retrieve products by category
            var products = await _context.Products
                .Where(p => p.Description == category) // Assuming your Product model has a Category property
                .ToListAsync();

            if (products == null || !products.Any())
            {
                return NotFound("No products found in this category.");
            }

            return Ok(products);
        }
        [HttpPost]
        [Route("/AddIncludedProduct")]
public async Task<IActionResult> AddIncludedProduct([FromBody] ISPbackas.Models.IncludedProduct includedProduct)
{
    try
    {
        // Check if the product exists
        var product = await _context.Products.FindAsync((ulong)includedProduct.FkProduct);
        if (product == null)
        {
            return NotFound("Product not found.");
        }

        // Check if the cart exists
        var cart = await _context.ShoppingCarts.FindAsync((ulong)includedProduct.FkShoppingCart);
        if (cart == null)
        {
            return NotFound("Cart not found.");
        }

        // Add the IncludedProduct to the database
        _context.IncludedProducts.Add(includedProduct);
        await _context.SaveChangesAsync();
        return Ok(includedProduct); // Return the created IncludedProduct
    }
    catch (Exception ex)
    {
        // Log the error to debug further
        Console.WriteLine($"Error: {ex.Message}");
        return StatusCode(500, "Internal server error: " + ex.Message);
    }


}}}
