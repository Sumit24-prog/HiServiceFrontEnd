import React from 'react';
import { ServiceRequest } from '../types';
import { deleteServiceRequest } from '../apiService';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import serviceRequestStyle from '../styles/ServiceRequestList.module.css'; // Import the CSS module

interface ServiceRequestListProps {
    userId: string;
    serviceRequests: ServiceRequest[];
    onServiceRequestUpdated: () => void;
}

const ServiceRequestList: React.FC<ServiceRequestListProps> = ({ serviceRequests, onServiceRequestUpdated }) => {
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = React.useState(false);
    const [selectedServiceId, setSelectedServiceId] = React.useState<string | null>(null);

    const handleEdit = (serviceId: string) => {
        navigate(`/edit-service-request/${serviceId}`);
    };

    const handleDelete = (serviceId: string) => {
        setSelectedServiceId(serviceId);
        setShowConfirmModal(true);
    };

    const confirmDelete = async () => {
        if (selectedServiceId) {
            try {
                await deleteServiceRequest(selectedServiceId);
                alert('Service request deleted successfully');
                onServiceRequestUpdated();
            } catch (error) {
                console.error('Failed to delete service request', error);
                alert('Failed to delete service request');
            } finally {
                setShowConfirmModal(false);
            }
        }
    };

    const handleCloseModal = () => setShowConfirmModal(false);

    return (
        <div className={serviceRequestStyle.container}>
            <h2>Service Requests</h2>
            {serviceRequests.length === 0 ? (
                <p>No service requests found.</p>
            ) : (
                <div className={serviceRequestStyle.cardContainer}>
                    {serviceRequests.map((request) => (
                        <div key={request.serviceId} className={serviceRequestStyle.card}>
                            <div className={serviceRequestStyle.cardsDetails}>
                                <h3 className={serviceRequestStyle.serviceType}>{request.serviceType}</h3>
                                <p><strong>Description:</strong> {request.description}</p>
                                <p><strong>Date Slot:</strong> {request.dateSlot}</p>
                                <p><strong>Vendor Name:</strong> {request.vendorName}</p>
                                <p><strong>Price:</strong> ${request.price}</p>
                                <p><strong>Address:</strong> {request.address}</p>
                            </div>
                            <div className={serviceRequestStyle.buttonContainer}>
                                <button className={serviceRequestStyle.button}
                                        onClick={() => handleEdit(request.serviceId)}>Edit
                                </button>
                                <button className={serviceRequestStyle.delButton}
                                        onClick={() => handleDelete(request.serviceId)}>Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this service request?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ServiceRequestList;
