import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../apiService';
import loginStyles from '../styles/Login.module.css';

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(identifier, password);
            navigate('/home');
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className={loginStyles.container}>
            <div className={loginStyles.login_container}>
                <h2>Login</h2>
                <input
                    type="text"
                    name="identifier"
                    placeholder="Username or Email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className={loginStyles.input_field}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={loginStyles.input_field}
                />
                <button onClick={handleLogin} className={loginStyles.login_button}>Login</button>
                {errorMessage && <div className={loginStyles.error_message}>{errorMessage}</div>}
                <p className={loginStyles.register_link}>
                    Not registered? <Link to="/register">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;