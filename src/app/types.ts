export interface Carrier {
    id: number;
    name: string;
  }
  
  export interface Shipment {
    id: number;
    origin: string;
    destination: string;
    carrier: string;
    shipDate: string;
    eta: string;
    status: string;
  }