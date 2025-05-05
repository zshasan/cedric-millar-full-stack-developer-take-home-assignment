using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShipmentApi.Data;
using ShipmentApi.Models;

namespace ShipmentApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShipmentsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ShipmentsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? status, [FromQuery] string? carrier)
    {
        var query = _context.Shipments.AsQueryable();

        if (!string.IsNullOrEmpty(status))
            query = query.Where(s => s.Status == status);

        if (!string.IsNullOrEmpty(carrier))
            query = query.Where(s => s.Carrier == carrier);

        return Ok(await query.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Shipment shipment)
    {
        _context.Shipments.Add(shipment);
        await _context.SaveChangesAsync();
        return Ok(shipment);
    }

    [HttpPut("{id}/status")]
    public IActionResult UpdateShipmentStatus(int id, [FromBody] StatusUpdateDto statusUpdate)
{
    var shipment = _context.Shipments.FirstOrDefault(s => s.Id == id);
    if (shipment == null)
    {
        return NotFound();
    }

    shipment.Status = statusUpdate.Status;
    _context.SaveChanges();

    return NoContent();
}

    public class StatusUpdateDto
    {
        public string Status { get; set; }
    }
}
