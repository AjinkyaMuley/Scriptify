import { Link } from "react-router-dom"

function Sidebar() {
    return (
        <div className="list-group">
            <Link to="/customer/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
            <Link to="/customer/orders" className="list-group-item list-group-item-action">Orders</Link>
            <Link to="/customer/wishlist" className="list-group-item list-group-item-action">WishList</Link>
            <Link to={'/customer/profile'} className="list-group-item list-group-item-action">Profile</Link>
            <Link to={'/customer/change-password'} className="list-group-item list-group-item-action">Change Password</Link>
            <Link to={'/customer/addresses'} className="list-group-item list-group-item-action">Addresses</Link>
            <Link href="#" className="list-group-item list-group-item-action text-danger">Logout</Link>
        </div>
    )
}

export default Sidebar