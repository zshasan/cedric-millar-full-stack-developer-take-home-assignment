/*
This is a simple read-only controller:

It exposes one endpoint: GET /api/carriers

It uses AppDbContext to pull data from the database

It returns a list of available carriers in JSON format
*/

using Microsoft.AspNetCore.Mvc;
// includes AppDbContext (EF Core context).
using ShipmentApi.Data;
//includes Shipment and Carrier classes.
using ShipmentApi.Models;

namespace ShipmentApi.Controllers;

// This says it is a REST-style API controller and enables automatic request validation and routing.
[ApiController]
// Maps the route the controller istens at
[Route("api/[controller]")]
public class CarriersController : ControllerBase
{
    private readonly AppDbContext _context;

    public CarriersController(AppDbContext context)
    {
        // Allows access to in-memory database
        _context = context;
    }
    // GET /api/carriers – List of available carriers Endpoint
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.Carriers.ToList());
    }
}
