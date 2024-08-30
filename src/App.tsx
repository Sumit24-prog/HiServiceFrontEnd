import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import ServiceRequestForm from './components/ServiceRequestForm';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import About from "./components/About.tsx";

const App = () => {
    const handleServiceRequestAdded = () => {
        // Handle the addition of a service request
    };

    const userId = localStorage.getItem('userId') || ''; // Use localStorage to get the userId

    return (
        <Routes>
            {/* Redirect from root to login */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            {/* PrivateRoute should protect specific paths */}
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/service-request"
                element={
                    <PrivateRoute>
                        <ServiceRequestForm
                            userId={userId}
                            onServiceRequestAdded={handleServiceRequestAdded}
                            isEdit={false}
                        />
                    </PrivateRoute>
                }
            />
            <Route
                path="/edit-service-request/:serviceId"
                element={
                    <PrivateRoute>
                        <ServiceRequestForm
                            userId={userId}
                            onServiceRequestAdded={handleServiceRequestAdded}
                            isEdit={true}
                        />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default App;
