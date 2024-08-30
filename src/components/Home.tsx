// Home.tsx
import React, { useEffect, useState } from 'react';
import ServiceRequestList from './ServiceRequestList';
import { fetchHomeData } from '../apiService';
import ServiceRequestForm from './ServiceRequestForm';
import { ServiceRequest } from "../types";
import Navbar from './Navbar';
import homeStyle from '../styles/Home.module.css';

interface User {
    userId: string;
    username: string;
    email: string;
    address: string;
    contactNumber: string;
}

const Home: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetchHomeData();
                setUser(response.user);
                setServiceRequests(response.serviceRequests);
            } catch (error) {
                setError('Failed to fetch home data');
                console.error('Failed to fetch home data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleServiceRequestAdded = () => {
        if (user) {
            fetchHomeData()
                .then((response) => {
                    setServiceRequests(response.serviceRequests);
                })
                .catch((error) => {
                    console.error('Failed to update service requests', error);
                });
        }
    };

    if (loading) {
        return <div className={homeStyle.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={homeStyle.error}>{error}</div>;
    }

    if (!user || !user.userId) {
        return <div className={homeStyle.loading}>Loading user information...</div>;
    }

    return (
        <div className={homeStyle.home_container}>
            <div className={homeStyle.home_contentContainer}>
                <Navbar />
                <div className={homeStyle.welcomeContainer}>
                    <h1 className={homeStyle.headingStyle}>Welcome to Service Management System</h1>
                    <p className={homeStyle.textContent}>Streamline your service requests and management with our <br/>comprehensive platform.</p>
                    <div className={homeStyle.buttonDiv}>
                        <button className={homeStyle.buttonStyle}>Get Started</button>
                        <button id= {homeStyle.learnMore} className={homeStyle.buttonStyle}>Learn More</button>
                    </div>
                </div>
                {/*<div>*/}
                {/* {user && <UserProfile user={user} />}*/}
                {/*</div>*/}
                <div>
                    <div className={homeStyle.serviceRequestContainer}>
                        <div className={homeStyle.serviceRequestContent}>
                            <h1 className={homeStyle.headingStyle}>Request For A Service</h1>
                            <div className={homeStyle.textContent}> Service management system, designed to facilitate a
                                wide range of service requests, including but not limited to AC repair, appliance
                                repair, fridge, washing machine, and various other types of services. It acts as a
                                server that accepts API requests and provides outputs accordingly, catering to both
                                users who need services and vendors who provide them. The backend is responsible for
                                handling user registrations, service requests, vendor management, and more, ensuring a
                                seamless operation of the service management ecosystem. A frontend will be developed in
                                the future to complement this backend, providing a user-friendly interface for
                                interacting with the system.
                            </div>
                        </div>
                        <ServiceRequestForm userId={user.userId} onServiceRequestAdded={handleServiceRequestAdded}
                                            isEdit={false}/>
                    </div>
                    <ServiceRequestList userId={user.userId} serviceRequests={serviceRequests}
                                        onServiceRequestUpdated={handleServiceRequestAdded}/>
                </div>
                <div className={homeStyle.designArt}>
                    <div className={homeStyle.triangle}></div>
                    <div className={homeStyle.triangle2}></div>
                </div>
            </div>
        </div>
    );
};

export default Home;
