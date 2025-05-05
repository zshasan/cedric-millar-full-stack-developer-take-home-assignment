using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ShipmentApi.Data;
using ShipmentApi.Models;

namespace ShipmentApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ShipmentsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<ShipmentsController> _logger;

    public ShipmentsController(AppDbContext context, ILogger<ShipmentsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string? status, [FromQuery] string? carrier)
    {
        _logger.LogInformation("Fetching shipments with status={Status} and carrier={Carrier}", status, carrier);
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
        _logger.LogInformation("Shipment created with ID {ShipmentId}", shipment.Id);
        return Ok(shipment);
    }

    [HttpPut("{id}/status")]
    public IActionResult UpdateShipmentStatus(int id, [FromBody] StatusUpdateDto statusUpdate)
{
    var shipment = _context.Shipments.FirstOrDefault(s => s.Id == id);
    if (shipment == null)
    {
        _logger.LogWarning("Attempted to update non-existent shipment ID {ShipmentId}", id);
        return NotFound();
    }

    shipment.Status = statusUpdate.Status;
    _context.SaveChanges();
    _logger.LogInformation("Updated status for shipment ID {ShipmentId} to {Status}", id, shipment.Status);

    return NoContent();
}

    public class StatusUpdateDto
    {
        public string Status { get; set; }
    }
}
