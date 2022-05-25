
import { useState, useEffect } from 'react';
const useToken = user => {
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.user.email;
        if (email) {
            fetch(`http://localhost:5000/users/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email }) // email must be wrapper with {} in order to operate correctly
            })
                .then(res => res.json())
                .then(data => {
                    // const accessToken = data.accessToken;
                    localStorage.setItem(`accessToken`, data.accessToken);
                })
        }
    }, [user])
    return [token]


};

export default useToken;