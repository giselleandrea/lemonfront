import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';
import '../App.css';

const Profile = () => {
    const [events, setEvents] = useState([]);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
        const response = await axios.get('http://localhost:3000/events/events');
        setEvents(response.data);
        } catch (error) {
        console.error('Error fetching events:', error);
        setErrors(error.response.data);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/events/delete/${id}`);
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            setErrors(error.response.data);
        }
    };

    const redirectToCreateEvent = () => {
        navigate('/create-event');
    };

    const redirectToEditEvent = (id) => {
        navigate(`/edit-event/${id}`);
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">Tus Eventos</h2>
            <button className="profile-button" onClick={redirectToCreateEvent}>
                Crear Evento
            </button>
            {errors && <div>{errors.error}</div>}
            <ul className="event-list">
                {events.map((event) => (
                    <li key={event.id} className="event-item">
                        <div className="event-name">{event.name}</div>
                        <div className="event-date">{new Date(event.event_date).toLocaleDateString()}</div>
                        <div className="event-capacity">Capacidad: {event.capacity}</div>
                        <div className="event-description">{event.description}</div>
                        <div className="event-actions">
                            <button className="edit-button" onClick={() => redirectToEditEvent(event.id)}>Editar</button>
                            <button className="delete-button" onClick={() => handleDelete(event.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
