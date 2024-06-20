import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import ErrorMessages from './ErrorMessages';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('/user/signup', {
            username,
            email,
            password,
            password_confirmation: passwordConfirmation
        });
            console.log('User created:', response.data);
            setShowSuccessAlert(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error creating user:', error.response);
            setErrors(error.response.data);
        }
    };

    return (
        <div className="form-container" >
            <div className="container" >            
                <h2>Registro de usuarios</h2>
                    {showSuccessAlert && (
                        <div className="success-alert">
                            Usuario creado con éxito. Redirigiendo a la página de inicio...
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="register-form">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <br />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                        <br />
                        <button type="submit">Crear</button>
                    </form>
                {errors && <ErrorMessages errors={errors} />}
                <div className="center">
                    <Link to="/" className="home-link">Ya estoy registrado</Link>
                </div>
            </div>
        </div>
    );
    };

export default RegisterForm;
