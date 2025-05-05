using Microsoft.EntityFrameworkCore;
using ShipmentApi.Models;

namespace ShipmentApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Shipment> Shipments => Set<Shipment>();
    public DbSet<Carrier> Carriers => Set<Carrier>();
}
