import { useEffect, useState } from 'react';
import Sidebar from './SellerSidebar';
import axios from 'axios';

function AddProduct(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [categoryData, setCategoryData] = useState([])
    const vendor_id = localStorage.getItem('vendor_id');
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [productData, setProductData] = useState({
        'category': '',
        'vendor': vendor_id,
        'title': '',
        'slug': '',
        'detail': '',
        'price': '',
        'usd_price': '',
        'tags': '',
        'image': '',
        'demo_url': '',
        'product_file': '',
    });

    useEffect(() => {
        fetchData(baseUrl + '/categories/')
    }, [])

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setCategoryData(data.results)
            })
    }

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('vendor', productData.vendor);
        formData.append('category', (productData.category));
        formData.append('slug', productData.slug);
        formData.append('title', productData.title);
        formData.append('usd_price', productData.usd_price);
        formData.append('price', productData.price);
        formData.append('tags', productData.tags);
        formData.append('image', productData.image);
        formData.append('demo_url', productData.demo_url);
        formData.append('detail', productData.detail);
        formData.append('product_file', productData.product_file);


        // Submit Data
        axios.post(baseUrl + '/products/', formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                if (response.status === 201) {
                    setErrorMsg('')
                    setSuccessMsg(response.statusText)
                }
                else {
                    setProductData({
                        'category': '',
                        'vendor': vendor_id,
                        'title': '',
                        'slug': '',
                        'detail': '',
                        'price': '',
                        'usd_price': '',
                        'tags': '',
                        'image': '',
                        'demo_url': '',
                        'product_file': '',
                    });
                    setErrorMsg(response.statusText);
                    setSuccessMsg('')
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const inputHandler = (event) => {
        setProductData({
            ...productData,
            [event.target.name]: event.target.value
        })
    }
    console.log(productData)

    const fileHandler = (event) => {
        setProductData({
            ...productData,
            [event.target.name]: event.target.files[0]
        })
    }

    // console.log(categoryData)

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='card'>
                        <h4 className='card-header'>Add Product</h4>
                        <div className='card-body'>
                            {successMsg && <p className='text-success'>{successMsg}</p>}
                            {errorMsg && <p className='text-success'>{errorMsg}</p>}
                            <form>
                                <div className="mb-3">
                                    <label for="Title" className="form-label">Category</label>
                                    <select className='form-control' name='category' value={productData.category} onChange={inputHandler}>
                                        <option value="" disabled>Select a category</option>  {/* Default option */}
                                        {
                                            categoryData.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.title}</option>  // Using id as value
                                                );
                                            })
                                        }
                                    </select>

                                </div>
                                <div className="mb-3">
                                    <label for="Title" className="form-label">Title</label>
                                    <input type="text" name='title' value={productData.title} className="form-control" onChange={inputHandler} id='Title' />
                                </div>
                                <div className="mb-3">
                                    <label for="Slug" className="form-label">Slug</label>
                                    <input type="text" name='slug' value={productData.slug} className="form-control" onChange={inputHandler} id='Slug' />
                                </div>
                                <div className="mb-3">
                                    <label for="INRPrice" className="form-label">INR Price</label>
                                    <input type="number" name='price' value={productData.price} className="form-control" onChange={inputHandler} id='INRPrice' />
                                </div>
                                <div className="mb-3">
                                    <label for="USDPrice" className="form-label">USD Price</label>
                                    <input type="number" name='usd_price' value={productData.usd_price} className="form-control" onChange={inputHandler} id='USDPrice' />
                                </div>
                                <div className="mb-3">
                                    <label for="Description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" rows={8} id='Description' name='detail' onChange={inputHandler} value={productData.detail} ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="Tags" className="form-label">Tags</label>
                                    <textarea type="text" className="form-control" rows={8} id='Tags' name='tags' onChange={inputHandler} value={productData.tags} ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="Demo_URL" className="form-label">Demo URL</label>
                                    <input type="url" name='demo_url' value={productData.demo_url} className="form-control" onChange={inputHandler} id='Demo_URL' />
                                </div>
                                <div className="mb-3">
                                    <label for="ProductImg" className="form-label">Featured Images</label>
                                    <input type="file" name='image' onChange={fileHandler} className="form-control" id='ProductImg' />
                                </div>
                                <div className="mb-3">
                                    <label for="Product_File" className="form-label">Product File</label>
                                    <input type="file" name='product_file' onChange={fileHandler} className="form-control" id='Product_File' />
                                </div>
                                <button onClick={submitHandler} type="button" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct