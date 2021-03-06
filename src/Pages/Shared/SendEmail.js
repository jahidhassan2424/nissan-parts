import React, { useState } from 'react';


const SendEmail = ({ user, subject, text }) => {
    const [result, setResult] = useState({})
    const emailBody = {
        toEmail: user.email,
        subject: { subject },
        text: { text },
    }

    fetch(`https://agile-oasis-28074.herokuapp.com/email`, {
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