import React from 'react';
import EventForm from './EventForm';
import axios from '../utils/axiosConfig';
import '../App.css';

const CreateEvent = () => {
    const handleSubmit = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/events/create', formData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return <EventForm onSubmit={handleSubmit} />;
};

export default CreateEvent;
