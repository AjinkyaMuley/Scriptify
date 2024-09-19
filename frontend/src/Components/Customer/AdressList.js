import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api'


function AddressList(props) {
    var customer_id = localStorage.getItem('customer_id')
    const [addressList, setAddressList] = useState([]);

    useEffect(() => {
        fetchData(baseUrl + '/customer/' + customer_id + '/address-list')
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setAddressList(data.results)
            })
    }

    function defaultAddressHandler(address,address_id) {
        const formData = new FormData();
        formData.append('address_id',address_id)

        // Submit Data
        axios.post(baseUrl + '/mark-default-address/' + address_id + '/', formData)
            .then(function (response) {
                if (response.data.bool == true) {
                    window.location.reload()
                } else {
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='col-12'>
                            <Link to={'/customer/add-address'} className='btn btn-outline-success mb-4 float-end'><i className='fa fa-plus'></i> Add Address</Link>
                        </div>
                    </div>
                    <div className='row'>
                        {
                            addressList.map((addresss, index) => {
                                return (
                                    <div className='col-4 mb-4'>
                                        <div className='card table-info'>
                                            <div className='card-body text-muted'>
                                                <h6>
                                                    {
                                                        addresss.default_address &&
                                                        <span role='button'>
                                                            <i className='fa fa-check-circle text-success mb-2'></i><br />
                                                        </span>
                                                    }
                                                    {
                                                        !addresss.default_address &&
                                                        <span onClick={() => defaultAddressHandler(addresss.address,addresss.id)} role='button'>
                                                            <i className='far fa-check-circle text-secondary mb-2'></i><br />
                                                        </span>
                                                    }
                                                    <Link to={`/customer/update-address/${addresss.id}`}>
                                                        {addresss.address}
                                                    </Link>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressList