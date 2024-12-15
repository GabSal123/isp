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
   [HttpGet]
[Route("/GetCartItems/{cartId}")]
public async Task<IActionResult> GetCartItems(ulong cartId)
{
    // Check if the shopping cart exists
    var cartExists = await _context.ShoppingCarts.AnyAsync(c => c.Id == cartId);
    if (!cartExists)
    {
        return NotFound($"Shopping cart with ID {cartId} not found.");
    }

    // Retrieve items in the shopping cart using a join
    var cartItems = await (from ip in _context.IncludedProducts
                            join p in _context.Products on (ulong)ip.FkProduct equals p.Id
                            where (ulong)ip.FkShoppingCart == cartId
                            select new
                            {
                                ip.Id,
                                ProductId = ip.FkProduct,
                                ProductName = p.Name,
                                ProductPrice = p.Price,
                                Quantity = ip.Amount
                            }).ToListAsync();

    if (!cartItems.Any())
    {
        return NotFound($"No items found in the shopping cart with ID {cartId}.");
    }

    return Ok(cartItems);
}
[HttpDelete]
[Route("/RemoveCartItem/{cartId}/{itemId}")]
public async Task<IActionResult> RemoveCartItem(ulong cartId, ulong itemId)
{
    // Check if the shopping cart exists
    var cartExists = await _context.ShoppingCarts.AnyAsync(c => c.Id == cartId);
    if (!cartExists)
    {
        return NotFound($"Shopping cart with ID {cartId} not found.");
    }

    // Check if the item exists in the shopping cart
    var cartItem = await _context.IncludedProducts
        .FirstOrDefaultAsync(ip => ip.Id == itemId && (ulong)ip.FkShoppingCart == cartId);

    if (cartItem == null)
    {
        return NotFound($"Item with ID {itemId} not found in shopping cart {cartId}.");
    }
    if(cartItem.Amount > 1) cartItem.Amount--;
    else{    // Remove the item from the cart
    _context.IncludedProducts.Remove(cartItem);
    }
await _context.SaveChangesAsync();
    return Ok($"Item with ID {itemId} successfully removed from shopping cart {cartId}.");
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
        product.AvailableQuantity -= includedProduct.Amount;
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
