import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessages from './ErrorMessages';
import '../App.css';

const EventForm = ({ initialValues = {}, onSubmit, isEdit = false }) => {
    const [name, setName] = useState(initialValues.name || '');
    const [description, setDescription] = useState(initialValues.description || '');
    const [event_date, setEventDate] = useState(initialValues.event_date || '');
    const [location, setLocation] = useState(initialValues.location || '');
    const [capacity, setCapacity] = useState(initialValues.capacity || '');
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await onSubmit({ 
                name, 
                description, 
                event_date, 
                location, 
                capacity 
            });
            console.log('Event saved:', response.data);
            setSuccess(true);
            setTimeout(() => {
                navigate('/profile');
            }, 2000); // Redirigir después de 2 segundos
        } catch (error) {
            console.error('Error saving event:', error);
            setErrors(error.response.data);
        }
    };

    return (
        <div className="form-container">
            <div className="container">
                <h2>{isEdit ? 'Editar Evento' : 'Crear Evento'}</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <input
                        type="text"
                        placeholder="Nombre del evento"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />
                    <input
                        type="date"
                        placeholder="Fecha"
                        value={event_date}
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Ubicación"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <br />
                    <input
                        type="number"
                        placeholder="Capacidad"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                    />
                    <br />
                    <button type="submit">{isEdit ? 'Actualizar evento' : 'Crear evento'}</button>
                </form>
                {errors && <ErrorMessages errors={errors} />}
                {success && <div className="success-message">Evento creado con éxito!</div>}
                <button className="back-button" onClick={() => navigate('/profile')}>Regresar a Eventos</button>
            </div>    
        </div>
    );
};

export default EventForm;
