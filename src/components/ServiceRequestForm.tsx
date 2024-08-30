import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { fetchServiceRequestById, updateServiceRequest, addServiceRequest } from '../apiService';
import { ServiceRequest } from '../types';
import styles from '../styles/ServiceRequestForm.module.css';

interface ServiceRequestFormProps {
    userId: string;
    onServiceRequestAdded: () => void;
    isEdit: boolean;
}

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ userId, onServiceRequestAdded, isEdit }) => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();

    const [serviceType, setServiceType] = useState('');
    const [description, setDescription] = useState('');
    const [dateSlot, setDateSlot] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('Pending');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isEdit && serviceId) {
            const fetchData = async () => {
                try {
                    const response = await fetchServiceRequestById(serviceId);
                    if (response) {
                        setServiceType(response.serviceType);
                        setDescription(response.description);
                        setDateSlot(response.dateSlot);
                        setVendorName(response.vendorName);
                        setPrice(response.price.toString());
                        setAddress(response.address);
                        setStatus(response.status);
                    } else {
                        setError('No data found for the given serviceId');
                    }
                } catch (error) {
                    setError('Failed to fetch service request');
                }
            };

            fetchData();
        }
    }, [isEdit, serviceId]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Ensure only valid numeric input and format with commas
        const value = e.target.value.replace(/[^0-9.]/g, '');
        setPrice(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const serviceRequest: ServiceRequest = {
            userId,
            serviceType,
            description,
            status,
            dateSlot,
            vendorName,
            price: parseFloat(price),
            address,
            serviceId: isEdit ? serviceId || '' : '',
        };

        try {
            const token = localStorage.getItem('token');
            if (token) {
                if (isEdit && serviceId) {
                    await updateServiceRequest(serviceId, serviceRequest, token);
                } else {
                    await addServiceRequest(serviceRequest, token);
                }
                setShowModal(true);
                onServiceRequestAdded();
                navigate('/home');
            } else {
                setError('No token found');
            }
        } catch (error) {
            setError('Failed to save service request');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className={styles['form-container']}>
            <form onSubmit={handleSubmit}>
                <div className={styles['form-group']}>
                    <label htmlFor="serviceType">Service Type:</label>
                    <input
                        id="serviceType"
                        type="text"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        required
                        placeholder={"e.g. AC Repair..."}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder={"Enter Description..."}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="dateSlot">Date Slot:</label>
                    <input
                        id="dateSlot"
                        type="datetime-local"
                        value={dateSlot}
                        onChange={(e) => setDateSlot(e.target.value)}
                        required
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="vendorName">Vendor Name:</label>
                    <input
                        id="vendorName"
                        type="text"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                        required
                        placeholder={"e.g., Ramesh Babu"}
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="price">Price:</label>
                    <input
                        id="price"
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        required
                        placeholder="e.g., 1234.56"
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="address">Address:</label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder={"e.g., 123 Kolkata,India"}
                    />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <button type="submit" className={styles['submit-button']}>
                        {isEdit ? 'Update' : 'Add'} Service Request
                    </button>
                )}
                {error && <p className={styles['error-message']}>{error}</p>}
            </form>

            <Modal show={showModal} onHide={handleCloseModal} className={styles['success-modal']}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>{isEdit ? 'Service request updated successfully!' : 'Service request added successfully!'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ServiceRequestForm;
