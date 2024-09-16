import { Link } from "react-router-dom"
import { useContext } from "react";
import { UserContext,CartContext } from "../Context";

function Header() {
    const userContext = useContext(UserContext);
    const {cartData,setCartData} = useContext(CartContext)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/">Scriptify</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/categories">Categories</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    My Account
                                </a>
                                <ul className="dropdown-menu">
                                    {userContext != 'true' &&
                                        <>
                                            <li><Link to="/customer/register" className="dropdown-item">Register</Link></li>
                                            <li><Link to="/customer/login" className="dropdown-item">Login</Link></li>
                                        </>
                                    }
                                    {userContext == 'true' &&
                                        <>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><Link to="/customer/dashboard" className="dropdown-item">Dashboard</Link></li>
                                            <li><Link to="/customer/logout" className="dropdown-item">Logout</Link></li>
                                        </>
                                    }
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Vendor Panel
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/seller/register" className="dropdown-item">Register</Link></li>
                                    <li><Link to="/seller/login" className="dropdown-item">Login</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link to="/seller/dashboard" className="dropdown-item">Dashboard</Link></li>
                                    <li><Link to="/" className="dropdown-item">Logout</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/checkout">New Orders (4)</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/checkout">My Cart ({cartData ? cartData.length : 0})
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header;
