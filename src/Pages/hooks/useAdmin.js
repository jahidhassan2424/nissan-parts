import { useEffect, useState } from "react";
import { SERVER_URL } from "../Shared/variables";

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        const email = user?.email;
        console.log('Use Admin Email', email);
        if (email) {
            // ${SERVER_URL}/
            fetch(`${SERVER_URL}/admin/${user.email}`, {
                headers: {
                    'content-type': 'application/json',
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