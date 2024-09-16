import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import axios from 'axios'
import { useState } from 'react';

function Login(props) {
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [loginFormData, setLoginFormData] = useState({
        "username": '',
        "password": ''
    });
    const [formError, setFormError] = useState(false);
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
        axios.post(baseUrl + '/customers/login/', formData)
            .then(function (response) {
                if (response.data.bool === false) {
                    setFormError(true)
                    setErrorMsg(response.data.msg)
                }
                else{
                    console.log(response.data)
                    localStorage.setItem('customer_username',response.data.user);
                    localStorage.setItem('customer_id',response.data.id);
                    localStorage.setItem('customer_login',true);
                    setFormError(false);
                    setErrorMsg('')
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const buttonEnable = (loginFormData.username != '') && (loginFormData.password != '');

    const check_customer = (localStorage.getItem('customer_login'))

    if(check_customer){
        window.location.href = '/customer/dashboard'
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-8 col-12 offset-2'>
                    <div className='card'>
                        <h4 className='card-header'>Login</h4>
                        <div className='card-body'>
                            <form>
                                {formError &&
                                    <p className='text-danger'>{errorMsg}</p>
                                }
                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input type="text" name='username' value={loginFormData.username} onChange={inputHandler} className="form-control" id='username' />
                                </div>
                                <div className="mb-3">
                                    <label for="pwd" className="form-label">Password</label>
                                    <input type="password" name='password' value={loginFormData.password} onChange={inputHandler} className="form-control" id='pwd' />
                                </div>
                                <button onClick={submitHandler} disabled={!buttonEnable} type="button" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login