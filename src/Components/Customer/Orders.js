import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg'

function Orders() {
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <Link to={'/'}>
                                                <img src={logo} className="img-thumbnail" width={'80'} alt="..." /> Django
                                            </Link>
                                        </td>
                                        <td>Rs. 500</td>
                                        <td><span className='text-success'><i className='fa fa-check-circle'></i> Completed</span></td>
                                        <td><button className='btn btn-primary'>Download</button></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <Link to={'/'}>
                                                <img src={logo} className="img-thumbnail" width={'80'} alt="..." /> Flask
                                            </Link>
                                        </td>
                                        <td>Rs. 500</td>
                                        <td><span className='text-success'><i className='fa fa-check-circle'></i> Completed</span></td>
                                        <td><button className='btn btn-primary'>Download</button></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <Link to={'/'}>
                                                <img src={logo} className="img-thumbnail" width={'80'} alt="..." /> Python
                                            </Link>
                                        </td>
                                        <td>Rs. 500</td>
                                        <td><span className='text-warning'><i className='fa fa-spin fa-spinning'></i> Processing</span></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>
                                            <Link to={'/'}>
                                                <img src={logo} className="img-thumbnail" width={'80'} alt="..." /> React
                                            </Link>
                                        </td>
                                        <td>Rs. 500</td>
                                        <td><span className='text-danger'><i className='fa fa-times-circle'></i> Cancelled</span></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders