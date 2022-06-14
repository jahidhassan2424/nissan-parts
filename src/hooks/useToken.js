
import { useState, useEffect } from 'react';
import auth from './../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
const useToken = variableUser => {
    const [user] = useAuthState(auth);
    const [token, setToken] = useState('');
    const dependentName = user?.displayName;


    useEffect(() => {
        const name = user?.displayName;
        const email = user?.email;
        const currentUser = { name, email }

        if (name) {
            fetch(`https://agile-oasis-28074.herokuapp.com/users/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ currentUser }) // email must be wrapper with {} in order to operate correctly
            })
                .then(res => res.json())
                .then(data => {
                    // const accessToken = data.accessToken;
                    setToken(data.accessToken);
                    localStorage.setItem(`accessToken`, data.accessToken);
                })
        }
    }, [dependentName])
    return [token]


};

export default useToken;