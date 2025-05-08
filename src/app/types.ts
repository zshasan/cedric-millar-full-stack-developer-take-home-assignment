// defines the shape of the carrier object, for example:
// {
//   "id": 1,
//   "name": "FedEx"
// }
export interface Carrier {
    id: number;
    name: string;
  }

// defines the shape of a shipment object, for example:
// {
//   "id": 42,
//   "origin": "Toronto",
//   "destination": "Calgary",
//   "carrier": "DHL",
//   "shipDate": "2024-05-06",
//   "eta": "2024-05-10",
//   "status": "In Transit"
// }  
export interface Shipment {
    id: number;
    origin: string;
    destination: string;
    carrier: string;
    shipDate: string;
    eta: string;
    status: string;
  }