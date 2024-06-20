import React from 'react';

const ErrorMessages = ({ errors }) => {
    return (
        <div>
        <h3>Error:</h3>
        <ul>
            {Object.keys(errors).map((key, index) => (
            <li key={index}>{`${key}: ${errors[key]}`}</li>
            ))}
        </ul>
        </div>
    );
};

export default ErrorMessages;