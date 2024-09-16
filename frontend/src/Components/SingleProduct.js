import { Link } from 'react-router-dom';
import logo from '../logo.svg';

function SingleProduct(props) {
    return (
        <div className='col-12 col-md-3 col-sm-4 mb-4'>
            <div className="card shadow" style={{ width: '18rem' }}>
                <Link to={`/product/${props.product.title}/${props.product.id}`}>
                    <img src={props.product.image} className="card-img-top" alt="..." />
                </Link>
                <hr />
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/product/${props.product.title}/${props.product.id}`}>{props.product.title}</Link></h5>
                    <h5 className="card-title text-muted">Price: <span>Rs. {props.product.price}</span></h5>
                </div>
                <div className='card-footer'>
                    <button title='Add to Cart' className='btn btn-success btn-sm'>
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                    <button title='Add to WishList' className='btn btn-danger btn-sm ms-1'>
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct