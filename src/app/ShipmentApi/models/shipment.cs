namespace ShipmentApi.Models;

public class Shipment
{
    public int Id { get; set; }
    public string Origin { get; set; } = string.Empty;
    public string Destination { get; set; } = string.Empty;
    public string Carrier { get; set; } = string.Empty;
    public string ShipDate { get; set; } = string.Empty;
    public string Eta { get; set; } = string.Empty;
    public string Status { get; set; }
}