import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateAddress(props) {
    const {address_id} = useParams()
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ErrorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('')
    var customer_id = localStorage.getItem('customer_id')
    const [addressFormData, setAddressFormData] = useState({
        'address': '',
        'customer': customer_id
    })

    useEffect(() => {
        fetchData(baseUrl + '/address/' + address_id)
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setAddressFormData({
                    'address': data.address,
                    'customer': customer_id
                })
                // console.log(data)
            })
    }

    const inputHandler = (event) => {
        setAddressFormData({
            ...addressFormData,
            [event.target.name]: event.target.value
        })
    };

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('address', addressFormData.address);
        formData.append('customer', addressFormData.customer);

        // Submit Data
        axios.put(baseUrl + '/address/' + address_id + '/',formData)
            .then(function (response) {
                if(response.status != 200){
                    setErrorMsg('Data not saved');
                    setSuccessMsg('')
                }else{
                    setSuccessMsg('Data saved')
                    setErrorMsg('')
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const disableBtn = (addressFormData.address=='')

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='card'>
                        <h4 className='card-header'>Upda Address</h4>
                        <div className='card-body'>
                            {ErrorMsg && <p className='alert alert-danger'>{ErrorMsg}</p>}
                            {successMsg && <p className='alert alert-success'>{successMsg}</p>}
                            <div className="mb-3">
                                <label for="address" className="form-label">Address</label>
                                <textarea className="form-control" onChange={inputHandler} name='address' value={addressFormData.address} id='address' ></textarea>
                            </div>
                            <button type="submit" disabled={disableBtn} onClick={submitHandler} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateAddress