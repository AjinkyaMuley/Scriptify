import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SellerLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('vendor_login');
        localStorage.removeItem('vendor_id');
        localStorage.removeItem('vendor_username');
        window.location.href = '/seller/login'
    }, [navigate]);

    return null; // No UI needed for the Logout component
}

export default SellerLogout;
