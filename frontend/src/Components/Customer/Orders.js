import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg'
import { useEffect, useState } from 'react';

function Orders() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const customerId = localStorage.getItem('customer_id');
    const [orderItems, setOrderItems] = useState([])

    useEffect(() => {
        fetchData(baseUrl + '/customer/' + customerId + '/orderitems')
    }, [])

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setOrderItems(data.results)
            })
    }

    console.log(orderItems)

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
                                    {
                                        orderItems.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Link to={`/product/${item.product_details.slug}/${item.product_details.id}`}>
                                                            <img src={item.product_details.image} className="img-thumbnail" width={'80'} alt="..." /> {item.product_details.title}
                                                        </Link>
                                                    </td>
                                                    <td>Rs. {item.product_details.price}</td>
                                                    <td>
                                                        <span>
                                                            {
                                                                item.order_details.order_status &&
                                                                <i className='fa fa-check-circle text-success'></i>
                                                            }
                                                            {
                                                                !item.order_details.order_status &&
                                                                <i className='fa fa-check-spinner text-dark'></i>
                                                            }
                                                        </span></td>
                                                    <td>
                                                        {
                                                            item.order_details.order_status &&
                                                            <a download={true} target='_blank' href={item.product_details.product_file} className='btn btn-primary'>Download</a>
                                                        }
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
        </div>
    )
}

export default Orders