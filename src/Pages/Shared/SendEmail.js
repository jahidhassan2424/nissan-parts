import React, { useState } from 'react';


const SendEmail = ({ user, subject, text }) => {
    const [result, setResult] = useState({})
    const emailBody = {
        toEmail: user.email,
        subject: { subject },
        text: { text },
    }
    console.log(emailBody);

    fetch(`http://localhost:5000/email`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(emailBody)
    })
        .then(res => res.json())
        .then(data => console.log(data))
};
// SendEmail();

export default SendEmail;