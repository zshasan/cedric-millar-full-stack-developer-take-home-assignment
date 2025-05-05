using Microsoft.EntityFrameworkCore;
using ShipmentApi.Data;
using ShipmentApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("ShipmentsDb"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

// Seed data
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

//app.UseHttpsRedirection();
app.MapControllers();
app.Run();
