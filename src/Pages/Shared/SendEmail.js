import React, { useState } from 'react';
import { SERVER_URL } from './variables';


const SendEmail = ({ user, subject, text }) => {
    const [result, setResult] = useState({})
    const emailBody = {
        toEmail: user.email,
        subject: { subject },
        text: { text },
    }

    fetch(`${SERVER_URL}/email`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'content-type': 'application/json'
        },

        body: JSON.stringify(emailBody)
    })
        .then(res => res.json())
        .then(data => console.log(data))
};
// SendEmail();

export default SendEmail;