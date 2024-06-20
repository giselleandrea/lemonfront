import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventForm from './EventForm';
import axios from '../utils/axiosConfig';
import '../App.css';

const EditEvent = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);  // Estado para manejar la carga

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/events/event/${eventId}`);
                setEvent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching event:', error);
                setLoading(false);  
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleSubmit = async (formData) => {
        try {
            const response = await axios.put(`http://localhost:3000/events/update/${eventId}`, { event: formData });
            return response;
        } catch (error) {
            throw error;
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {event ? (
                <EventForm initialValues={event} onSubmit={handleSubmit} isEdit />
            ) : (
                <p>Error loading event</p>
            )}
        </div>
    );
};

export default EditEvent;
