using Microsoft.AspNetCore.Mvc;
using ISPbackas.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Extensions.FileSystemGlobbing.Internal.PathSegments;

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
[Route("/RecommendProducts/{userId}")]
public async Task<IActionResult> RecommendProducts(ulong userId)
{
    // Check if the user exists
    var userExists = await _context.RegisteredUsers.AnyAsync(u => u.Id == userId);
    if (!userExists)
    {
        return NotFound($"User with ID {userId} not found.");
    }

    // Fetch the user's cart and purchased product information
    var userCarts = await (from c in _context.ShoppingCarts
                           join ip in _context.IncludedProducts on c.Id equals (ulong)ip.FkShoppingCart
                           join p in _context.Products on (ulong)ip.FkProduct equals p.Id
                           where (ulong)c.FkRegisteredUser == userId
                           select new
                           {
                               ProductId = p.Id,
                               ProductName = p.Name,
                               ProductPrice = p.Price,
                               ProductBrand = p.Brand,
                               ProductCategory = p.Description, // Assuming there's a Category field
                               ProductStock = p.AvailableQuantity,
                               ProductScore = p.Score
                           }).ToListAsync();

    // Check if there are products in the user's cart history
    if (userCarts == null || !userCarts.Any())
    {
        return NotFound($"No previous cart data found for user with ID {userId}.");
    }

    // Extract unique brands, categories, and price range from the user's cart history
    var purchasedBrands = userCarts.Select(p => p.ProductBrand).Distinct().ToList();
    var purchasedCategories = userCarts.Select(p => p.ProductCategory).Distinct().ToList();
    var minPrice = userCarts.Min(p => p.ProductPrice);
    var maxPrice = userCarts.Max(p => p.ProductPrice);

    // Step 1: Query products that match user purchase patterns
    var recommendedProducts = await (from p in _context.Products
                                     where (p.Brand != null && purchasedBrands.Contains(p.Brand)) 
                                           || (p.Description != null && purchasedCategories.Contains(p.Description))
                                           || (p.Price >= minPrice * 0.8 && p.Price <= maxPrice * 1.2) // +/- 20% price range
                                           && p.AvailableQuantity > 0 // Ensure products are available in stock
                                           && p.Score >= 2 // Optional: filter for products with a decent rating
                                     orderby p.Price // Optional: order by price to diversify recommendations
                                     select p).Take(3) // Limit to top 10 recommendations
                                     .ToListAsync();

    // Step 2: If you want more randomization, you can shuffle the results
    var random = new Random();
    recommendedProducts = recommendedProducts.OrderBy(x => random.Next()).Take(10).ToList();

    // Step 3: Return the recommended products
    return Ok(recommendedProducts);
}


[HttpGet]
[Route("/GetCartsByUserId/{userId}")]
public async Task<IActionResult> GetCartsByUserId(ulong userId)
{
    // Log userId to check its value
    Console.WriteLine($"Looking for user with ID: {userId}");

    // Check if the user exists
    var userExists = await _context.RegisteredUsers.AnyAsync(u => u.Id == userId);
    if (!userExists)
    {
        // Log to check if it's not finding the user
        Console.WriteLine($"User with ID {userId} was not found.");
        return NotFound($"User with ID {userId} not found.");
    }

    // Retrieve the carts associated with the user
var userCarts = await (from c in _context.ShoppingCarts
                       join ip in _context.IncludedProducts on c.Id equals (ulong)ip.FkShoppingCart  // Join with IncludedProducts table
                       join p in _context.Products on (ulong)ip.FkProduct equals p.Id  // Join with Products table to get price
                       where (ulong)c.FkRegisteredUser == userId
                                                   select new
                            {
                                ip.Id,
                                ProductId = ip.FkProduct,
                                ProductName = p.Name,
                                ProductPrice = p.Price,
                                Quantity = ip.Amount
                            }).ToListAsync();



    // Check if there are any carts for the user
    if (userCarts == null || !userCarts.Any())
    {
        // Log to check why no carts are found
        Console.WriteLine($"No carts found for user with ID {userId}.");
        return NotFound($"No carts found for user with ID {userId}.");
    }

    // Return the user's carts
    return Ok(userCarts);
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
