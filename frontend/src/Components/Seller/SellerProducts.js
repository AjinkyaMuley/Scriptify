import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import Sidebar from './SellerSidebar';
import { useEffect, useState } from 'react';

function SellerProducts(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [productData, setProductData] = useState([])


    useEffect(() => {
        fetchData(baseUrl + '/products/')
    }, [])

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data.results)
            })
    }

    console.log(productData)

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
                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Products</th>
                                    <th>Price</th>
                                    <th>USD Price</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productData.map((product, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td><Link to={`/seller/update-product/${product.id}`}>{product.title}</Link></td>
                                                <td>&#8377;{product.price}</td>
                                                <td>${product.usd_price}</td>
                                                <td>
                                                    {
                                                        !product.publish_status && 'Pending'
                                                    }
                                                    {
                                                        product.publish_status && <span className='text-success'>Published</span>
                                                    }
                                                </td>
                                                <td>
                                                    <a href='#' className='btn btn-primary ms-1'>Edit</a>
                                                    <a href='#' className='btn btn-danger ms-1'>Delete</a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerProducts