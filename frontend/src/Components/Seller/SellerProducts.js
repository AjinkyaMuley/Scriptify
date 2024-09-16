import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import Sidebar from './SellerSidebar';

function SellerProducts(props) {
    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <Link to={'/seller/add-product'} className='btn btn-primary mb-4 float-end'><i className='fa fa-plus'></i> Add Product</Link>
                        </div>
                    </div>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Product Title</td>
                                    <td>500</td>
                                    <td>Published</td>
                                    <td>
                                        <a href='#' className='btn btn-info'>View</a>
                                        <a href='#' className='btn btn-primary ms-1'>Edit</a>
                                        <a href='#' className='btn btn-danger ms-1'>Delete</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerProducts