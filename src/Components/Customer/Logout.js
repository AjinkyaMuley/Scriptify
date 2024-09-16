import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('customer_login');
        localStorage.removeItem('customer_id');
        localStorage.removeItem('customer_username');
        window.location.href = '/customer/login'
    }, [navigate]);

    return null; // No UI needed for the Logout component
}

export default Logout;
