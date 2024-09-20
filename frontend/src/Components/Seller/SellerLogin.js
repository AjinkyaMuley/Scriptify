import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import axios from 'axios'
import { useState } from 'react';

function SellerLogin(props) {
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [loginFormData, setLoginFormData] = useState({
        'username': '',
        'password': '',
    });
    const [errorMsg, setErrorMsg] = useState('')

    const inputHandler = (event) => {
        setLoginFormData({
            ...loginFormData,
            [event.target.name]: event.target.value
        })
    };

    const submitHandler = (event) => {
        const formData = new FormData();
        formData.append('username', loginFormData.username);
        formData.append('password', loginFormData.password);

        // Submit Data
        axios.post(baseUrl + '/vendor/login/', formData)
            .then(function (response) {
                if (response.data.bool === false) {
                    setErrorMsg(response.data.msg)
                }
                else {
                    console.log(response.data)
                    localStorage.setItem('vendor_username', response.data.user);
                    localStorage.setItem('vendor_id', response.data.id);
                    localStorage.setItem('vendor_login', true);
                    setErrorMsg('')
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const check_vendor = (localStorage.getItem('vendor_login'))

    if(check_vendor){
        window.location.href = '/seller/dashboard'
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Login</h4>
                        <div className='card-body'>
                        {
                            errorMsg && 
                            <p className='text-danger'>{errorMsg}</p>
                        }
                            <form>
                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input type="text" onChange={inputHandler} name='username' className="form-control" id='username' value={loginFormData.username} />
                                </div>
                                <div className="mb-3">
                                    <label for="pwd" className="form-label">Password</label>
                                    <input type="password" onChange={inputHandler} name='password'
                                        value={loginFormData.password} className="form-control" id='pwd' />
                                </div>
                                <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerLogin