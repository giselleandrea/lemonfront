import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import ErrorMessages from './ErrorMessages';
import '../App.css';

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { 
                email, 
                password 
            });
            localStorage.setItem('auth_token', response.data.auth_token);
            navigate('/profile');
        } catch (error) {
            if (error.response) {
                setErrors(error.response.data);
            } else {
                setErrors({ error: 'Something went wrong. Please try again.' });
            }
        }
    };

    return (
        <div className="form-container" >
            <div className="container" >
                <h2>Login</h2>
                    <form onSubmit={handleLogin}>
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
                        <button type="submit">Iniciar sesión</button>
                    </form>
                    <br />
                    <button className="custom-button" onClick={() => navigate('/signup')}>
                        Registrarme
                    </button>

                    {errors && <ErrorMessages errors={errors} />}
            </div>    
        </div>
    );
};

export default Home;