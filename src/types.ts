// src/apiService.ts
export interface ServiceRequest {
    serviceId: string;
    userId: string;
    serviceType: string;
    description: string;
    status: string; // Ensure this is included
    dateSlot: string;
    vendorName: string;
    price: number;
    address: string;
}
