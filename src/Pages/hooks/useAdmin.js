import { useEffect, useState } from "react";

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const email = user.email;
        if (email) {
            fetch(`https://evening-woodland-82887.herokuapp.com/admin/${user?.email}`, {
                headers: {
                    'content-type': 'application.json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    setAdmin(data);

                })
        }
    }, [user])
    return [admin];

}
export default useAdmin;