import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface ServiceRequest {
    serviceId?: string;
    userId: string;
    serviceType: string;
    description: string;
    status: string;
    dateSlot: string;
    vendorName: string;
    price: number;
    address: string;
}

export interface RegisterResponse {
    customerId: string;
}


export const login = async (identifier: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { identifier, password });
    const token = response.data; // Assuming response.data contains the JWT token
    localStorage.setItem('token', token);
    return token;
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return { Authorization: `Bearer ${token}` };
};

export const logout = async () => {
    await axios.post(`${API_BASE_URL}/logout`, null, {
        headers: getAuthHeaders(),
    });
    localStorage.removeItem('token'); // Clear the token from local storage
};

export const fetchHomeData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/home`, {
            headers: getAuthHeaders(),
        });
        localStorage.setItem('userId', response.data.user.userId);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch home data:', error);
        throw error;
    }

};

// src/apiService.ts

export const addServiceRequest = async (serviceRequest: ServiceRequest, token: string) => {
    const response = await fetch(`${API_BASE_URL}/serviceRequests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(serviceRequest)
    });
    if (!response.ok) {
        throw new Error('Failed to add service request');
    }
    return response.json();
};

export const updateServiceRequest = async (serviceId: string, serviceRequest: ServiceRequest, token: string) => {
    const response = await fetch(`${API_BASE_URL}/serviceRequests/${serviceId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceRequest),
    });

    if (!response.ok) {
        throw new Error('Failed to update service request');
    }

    return response.json();
};

export const deleteServiceRequest = async (serviceId: string) => {
    await axios.delete(`${API_BASE_URL}/serviceRequests/${serviceId}`, {
        headers: getAuthHeaders(),
    });
};

// Add this method to fetch a specific service request by its ID
export const fetchServiceRequestById = async (serviceId: string) => {
    const response = await fetch(`${API_BASE_URL}/serviceRequests/${serviceId}`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error('Failed to fetch service request');
    }
    return response.json();
};


export const register = async (formData: { username: string; email: string; password: string; address: string; contactNumber: string; }): Promise<RegisterResponse> => {
    const response = await axios.post(`${API_BASE_URL}/register`, formData);
    return response.data;
};