// for in-memory database support.
using Microsoft.EntityFrameworkCore;
using ShipmentApi.Models;

namespace ShipmentApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    // Defines a table in the database for Shipment objects
    public DbSet<Shipment> Shipments => Set<Shipment>();
    // Defines a table in the database for Carrier objects
    public DbSet<Carrier> Carriers => Set<Carrier>();
}
