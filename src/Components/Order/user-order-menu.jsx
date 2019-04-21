import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/style.css';

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            giftQnt: 1
        }
    }
     handleChange(event) {
        let value = event.target.value;
        if(Number(event.target.value) < 1){
            this.setState({
                [event.target.name] :Number(value) + 1,
            })
        }else{
        this.setState({
            [event.target.name] : value,
        })}
    }
    render() {
        let currentProduct = {};
        this.props.gifts.forEach(element => {
            if (element._id === this.props.match.params.id) {
                currentProduct = element;
                return;
            }
        });
        let currentUsername = sessionStorage.getItem('username');
        let data = {
            productName: currentProduct.giftName,
            price: currentProduct.price,
            user: currentUsername,
            giftQnt: this.state.giftQnt

        }

        function orderGift(e, data) {
            e.preventDefault();

            fetch('http://localhost:9999/feed/user/newOrder', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json', }
            }).then(rawData => rawData.json())
                .then(responseBody => {
                    if (!responseBody.errors) {
                        toast.success(responseBody.message, {
                            closeButton: false,
                        })
                        // setTimeout(function () { window.location.href = 'http://localhost:3000/cart'; }, 1000);
                    } else {
                        toast.error(responseBody.message, {
                            closeButton: false,
                        })
                    }
                })
        }

        return (
            <Fragment>
                <form onSubmit={(e) => orderGift(e, data)}>
                    <div className="orders-wrapper">
                        <div className="productImage">
                            <img src={currentProduct.imageUrl} />
                        </div>
                        <div className="orders">
                            <span>Product</span>
                            <span className="gift-name" name="productName">{currentProduct.giftName}</span>

                            <span>Price</span>
                            <span className="gift-total-price" name="price">{currentProduct.price}</span>
                            <input className="giftQuantity" onChange={this.handleChange.bind(this)} name="giftQnt" type="number"
                                value={this.state.giftQnt} readOnly={false}/>
                            <div className="order-buttons">
                                <NavLink to="/" className="continue-shopping">Back to menu</NavLink>
                                <button className="checkout">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Fragment>
        )
    }

    // componentDidMount() {
    //     // let id = this.props.match.params.id;
    //     console.log(this.props)
    // }
}
export default Order;