import { useContext, useEffect, useState } from "react"
import { CartContext, CurrencyContext, UserContext } from "../Context";
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'
function ConfirmOrder() {
    const [ConfirmOrder, setConfirmOrder] = useState(false)
    const userContext = useContext(UserContext);
    const [orderStatus, setOrderStatus] = useState(false)
    const [orderID, setOrderID] = useState('');
    const [orderAmount, setOrderAmount] = useState(0)
    const [payMethod, setPayMethod] = useState('')
    const { cartData, setCartData } = useContext(CartContext);
    const { currencyData } = useContext(CurrencyContext)


    useEffect(() => {
        if (userContext == null) {
            window.location.href = '/customer/login';
        } else {

            if (ConfirmOrder === false)
                addOrderInDB();
        }
    }, [userContext]);

    function addOrderInDB() {

        const customerID = localStorage.getItem('customer_id');

        if (!customerID) {
            console.log('Customer ID is missing');
        } else {

            var prevCart = localStorage.getItem('cartData');
            var cartJson = JSON.parse(prevCart);
            var total_amount = 0;
            var total_usd_amount = 0;
            cartJson.map((cart, index) => {
                total_amount += parseFloat(cart.product.price)
                total_usd_amount += parseFloat(cart.product.usd_price)
            })

            const formData = new FormData();
            formData.append('customer', customerID);
            formData.append('total_amount', total_amount);
            formData.append('total_usd_amount', total_usd_amount);


            // Submit Data
            axios.post(baseUrl + 'orders/', formData)
                .then(function (response) {
                    var orderID = response.data.id;
                    if (currencyData == 'usd') {
                        setOrderAmount(response.data.total_usd_amount)
                    } else {
                        setOrderAmount(response.data.total_amount)
                    }
                    setOrderID(orderID)
                    orderItems(orderID);
                    setConfirmOrder(true)
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    function orderItems(orderId) {
        var prevCart = localStorage.getItem('cartData');
        var cartJson = JSON.parse(prevCart);

        var orderItemsList = [];
        console.log(cartJson)

        var sum = 0;
        if (cartJson != null) {
            cartJson.forEach((cart, index) => {
                const formData = new FormData();
                formData.append('order', orderId);
                formData.append('product', cart.product.id);
                formData.append('qty', 1);
                formData.append('price', cart.product.price);
                formData.append('usd_price', cart.product.usd_price);

                // Submit Data
                axios.post(baseUrl + 'orderitems/', formData)
                    .then(function (response) {
                        console.log('Order item added:', response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });

            // Once all items are processed, update cart data
            cartJson = []; // Clear cart after order is confirmed
            localStorage.setItem('cartData', JSON.stringify(cartJson));
            setCartData(cartJson);  // Set the updated (empty) cart in state
        }
    }


    console.log(userContext);


    function changePaymentMethod(payMethod) {
        setPayMethod(payMethod);
    }

    function PayNowButton() {
        if (payMethod != '')
            changePaymentMethod(payMethod)

        else
            alert('Select Payment Method')
    }

    function updateOrderStatus(order_id, order_status) {
        // console.log(order_id,order_status)
        axios.post(baseUrl + 'update-order-status/' + orderID)
            .then(function (response) {
                window.location.href = '/order/success'
            })
            .catch(function (error) {
                window.location.href = '/order/failure'
            })
    }

    useEffect(() => {
        if (orderStatus) {
            console.log('Order status updated to:', orderStatus);
            // You can trigger the updateOrderStatus(orderId, true) here if needed
            updateOrderStatus(orderID, true);
        }
    }, [orderStatus]); // This effect will run whenever `orderStatus` is updated


    // Function to handle updating order status when PayPal buttons are clicked
    const handlePayPalClick = () => {
        setOrderStatus(true);  // Set order status immediately when PayPal button is clicked
        // updateOrderStatus(orderId, true);  // Update status in the backend
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6 offset-3">
                    <div className="card py-3 text-center">
                        <h3><i className="fa fa-check-circle text-success"></i> Your order has been confirmed</h3>
                        <h5>ORDER ID : {orderID}</h5>
                    </div>
                    <div className="card p-3 mt-4">
                        <form>
                            {
                                currencyData == 'usd' &&
                                <div className="form-group">
                                <label>
                                    <input onChange={() => changePaymentMethod('paypal')} type="radio" name="payMethod" /> PayPal
                                </label>
                            </div>
                            }
                            {
                                currencyData == 'usd' &&
                                <div className="form-group">
                                <label>
                                    <input onChange={() => changePaymentMethod('paypal')} type="radio" name="payMethod" /> Stripe   
                                </label>
                            </div>
                            }
                            {
                                currencyData != 'usd' &&
                                <div className="form-group">
                                    <label>
                                        <input type="radio" onChange={() => changePaymentMethod('razorpay')} name="payMethod" /> RazorPay
                                    </label>
                                </div>
                            }
                            {
                                currencyData != 'usd' &&
                                <div className="form-group">
                                    <label>
                                        <input type="radio" onChange={() => changePaymentMethod('razorpay')} name="payMethod" /> PayTm
                                    </label>
                                </div>
                            }
                            <button type="button" onClick={PayNowButton} className="btn btn-sm btn-success mt-3">Next</button>
                        </form>
                        {payMethod === 'paypal' &&
                            <PayPalScriptProvider>
                                <PayPalButtons className="mt-3"
                                    createOrder={(data, actions) => {
                                        handlePayPalClick();
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: 'USD',
                                                        value: { orderAmount }
                                                    }
                                                }
                                            ]
                                        })
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            const name = details.payer.name.given_name;
                                            alert(`Transaction completed by ${name}`);
                                            setOrderStatus(true)
                                            // updateOrderStatus(orderId,orderStatus)
                                        })
                                    }}
                                />

                            </PayPalScriptProvider>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder