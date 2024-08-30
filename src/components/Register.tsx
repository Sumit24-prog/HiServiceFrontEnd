import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, RegisterResponse } from '../apiService';
import registerStyels from '../styles/Register.module.css';
import SuccessRegistrationModal from './SuccessRegistrationModal';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        address: '',
        contactNumber: '',
    });
    const [responseMessage, setResponseMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const data: RegisterResponse = await register(formData);
            if (data && data.customerId) {
                setResponseMessage(`Registration successful. Your customer ID is ${data.customerId}`);
                setShowModal(true);
            } else {
                setResponseMessage('Registration successful, but no customer ID returned.');
                setShowModal(true);
            }
        } catch (error) {
            console.error('Registration failed', error);
            setResponseMessage('Registration failed. Please try again.');
            setShowModal(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <div className={registerStyels.container}>
            <div className={registerStyels.register_container}>
                <h2>Register</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className={registerStyels.input_field}
                />
                <br/>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={registerStyels.input_field}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={registerStyels.input_field}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className={registerStyels.input_field}
                />
                <input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className={registerStyels.input_field}
                />
                <button onClick={handleRegister} className={registerStyels.register_button}>Register</button>
                {showModal && <SuccessRegistrationModal message={responseMessage} onClose={handleCloseModal} />}
                <p className={registerStyels.login_link}>
                    Already registered? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;