// EntityFrameworkCore: for in-memory database support.
using Microsoft.EntityFrameworkCore;
// ShipmentApi.Data: includes AppDbContext (EF Core context).
using ShipmentApi.Data;
//includes Shipment and Carrier classes.
using ShipmentApi.Models;

// Initializes the app’s builder (dependency injection container, configuration, logging, etc.).
var builder = WebApplication.CreateBuilder(args);

// Add services
// Clears default logging providers and adds console logging (for terminal/debug output).
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
// Registers database to use In-Memory database
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("ShipmentsDb"));
// Enables Swagger API docs and standard controller support.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// Builds the app
var app = builder.Build();

// Seed sample data and list of carriers
// Creates a scope to access services like AppDbContext outside of a request context.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Carriers.AddRange(
        new Carrier { Id = 1, Name = "FedEx" },
        new Carrier { Id = 2, Name = "UPS" },
        new Carrier { Id = 3, Name = "DHL" }
    );

    db.Shipments.Add(new Shipment
    {
        Id = 1,
        Origin = "Toronto",
        Destination = "Vancouver",
        Carrier = "FedEx",
        ShipDate = "2024-05-04",
        Eta = "2024-05-10",
        Status = "Pending"
    });

    db.SaveChanges();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
// sets up route matching for [ApiController] routes.
app.MapControllers();
app.Run();
// Starts up REST endpoints based on your controllers