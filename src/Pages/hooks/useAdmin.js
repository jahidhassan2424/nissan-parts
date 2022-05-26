import { useEffect, useState } from "react";

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const email = user.email;
        if (email) {
            fetch(`http://localhost:5000/admin/${user?.email}`, {
                headers: {
                    'content-type': 'application.json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    setAdmin(data);
                    console.log('isadmin:', data);

                })
        }
    }, [user])
    return [admin];

}
export default useAdmin;