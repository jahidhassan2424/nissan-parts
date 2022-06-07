
import { useState, useEffect } from 'react';
import auth from './../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
const useToken = variableUser => {
    const [user] = useAuthState(auth);
    const [token, setToken] = useState('');
    console.log('User inside seToken', user);
    console.log('user>user', user?.user);
    const dependentName = user?.displayName;
    // if (user?.user.name) {

    //     console.log('User inside seToken',);
    // }
    // else if (user?.user.name) {

    //     console.log('User inside seToken',);
    // }

    useEffect(() => {
        const name = user?.displayName;
        const email = user?.email;
        console.log('name inside useToken', name);
        console.log('token in useToken', token);
        const currentUser = { name, email }

        if (name) {
            fetch(`http://localhost:3001/users/${email}`, {
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