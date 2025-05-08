// This defines what a Carrier is, a company with unique ID and Name

namespace ShipmentApi.Models;

public class Carrier
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}
