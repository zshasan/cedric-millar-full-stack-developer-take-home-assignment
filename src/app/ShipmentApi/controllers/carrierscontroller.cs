using Microsoft.AspNetCore.Mvc;
using ShipmentApi.Data;
using ShipmentApi.Models;

namespace ShipmentApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarriersController : ControllerBase
{
    private readonly AppDbContext _context;

    public CarriersController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Carriers.ToList());
    }
}
