import { useEffect, useState } from 'react';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';
import { Link, useParams, useSearchParams } from 'react-router-dom';

function TagProducts() {
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [Products, setProducts] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    let {tag} = useParams()

    useEffect(() => {
        fetchData(baseUrl + '/products/' + tag)
    }, [])

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results)
                setTotalResult(data.count)
            })
    }

    function changeUrl(baseUrl){
        fetchData(baseUrl)
    }

    var links = [];
    var limit = 1
    var totalLinks = totalResult / limit;
    for (let i = 1; i <= totalLinks; i++) {
        links.push(<li class="page-item"><Link onClick={() => changeUrl(baseUrl + `/products/${tag}?page=${i}`)} to={`/products/${tag}/?page=${i}`} class="page-link" href="#">{i}</Link></li>)
    }

    return (
        <section className='container mt-4'>
            {/* Latest Products */}
            <h3 className='mb-4'>All Products</h3>
            <div className='row mb-4'>
                {/* Product Box */}
                {
                    Products.map((p) => <SingleProduct product={p} />)
                }
                {/* Product box end */}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    {links}
                </ul>
            </nav>
            {/* End Latest Products */}
        </section>
    )
}

export default TagProducts