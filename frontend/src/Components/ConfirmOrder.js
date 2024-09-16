import { useContext, useEffect } from "react"
import { CartContext, UserContext } from "../Context"
import axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/api/'
function ConfirmOrder() {
    const userContext = useContext(UserContext);
    const { cartData, setCartData } = useContext(CartContext);

    
    useEffect(() => {
        if (userContext == null) {
            window.location.href = '/customer/login';
        } else {
            addOrderInDB();
        }
    }, [userContext]); 

    function addOrderInDB() {

        const customerID = localStorage.getItem('customer_id');

        if (!customerID) {
            console.log('Customer ID is missing');
        } else {
            const formData = new FormData();
            formData.append('customer', customerID);


            // Submit Data
            axios.post(baseUrl + 'orders/', formData)
                .then(function (response) {
                    var orderID = response.data.id
                    orderItems(orderID);
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
    
        if (cartJson != null) {
            cartJson.forEach((cart, index) => {
                const formData = new FormData();
                formData.append('order', orderId);
                formData.append('product', cart.product.id);
                formData.append('qty', 1);
                formData.append('price', cart.product.price);
    
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
    

    console.log(userContext)

    return (
        <h1>Your order has been confirmed</h1>
    )
}

export default ConfirmOrder