import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/style.css';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userOrders: [],
            quantity: 1,
        }

    }

    deleteSingleGift(user, productName) {
        let giftObj = {
            user: user,
            productName: productName
        }
        fetch('http://localhost:9999/feed/user/deleteSingleGift', {
            method: "POST",
            body: JSON.stringify(giftObj),
            headers: { 'Content-Type': 'application/json', }
        }).then(
            toast.success("You`ve deleted the choosen gift", {
                closeButton: false,
            })

        )
        setTimeout(function () { window.location.href = 'http://localhost:3000/cart'; }, 1500);
    }

    componentWillMount() {
        fetch('http://localhost:9999/feed/user/orders', {
            method: 'GET'
        }).then(rawData => rawData.json())
            .then(body => {
                this.setState({
                    userOrders: body.order
                })

            }
            );
    }

    render() {
        function removeUserOrders(user) {
            let userObj = {
                user: user
            }
            fetch('http://localhost:9999/feed/user/delete', {
                method: "POST",
                body: JSON.stringify(userObj),
                headers: { 'Content-Type': 'application/json', }
            }).then(
                toast.success("You`ve made a successfull purchase", {
                    closeButton: false,
                })

            )
            setTimeout(function () { window.location.href = 'http://localhost:3000'; }, 1500);
        }



        let allOrders = this.state.userOrders;

        let currentUser = sessionStorage.getItem('username');
        let currentUserOrders = [];
        allOrders.forEach((element) => {
            if (element.user === currentUser) {
                currentUserOrders.push(element);
            }
        })
        let sum = 0;
        let parsedSum = [];
        let sumArray = [];
        let qntArray = [];
        currentUserOrders.forEach((s) => {
            qntArray.push(s.giftQnt);
        })

        currentUserOrders.forEach((order) => {
            parsedSum.push(order.price);
        })

        for (let i = 0; i < parsedSum.length; i++) {
            let tempArr = parsedSum[i].split(" ");
            sumArray.push(tempArr[0]);
        }

        for (let i = 0; i < sumArray.length; i++) {
            // sumArray[i] = Number(sumArray[i]);
            sumArray[i] = qntArray[i] * Number(sumArray[i]);
        }
        for (let j = 0; j < currentUserOrders.length; j++) {
            let tempPrice = currentUserOrders[j].price.split(" USD");
            currentUserOrders[j].price = Number(tempPrice[0]) * qntArray[j];

        }

        sumArray.forEach((s) => {
            s = Number(s)
            sum += s;
        })

        return (

            <Fragment>
                {
                    sumArray[0] ? (
                        <Fragment>
                        <h2 className="class-title">My Cart</h2>
                        <div className="table-head">
                            <span className="productName">Product</span>
                            <span className="order-price">Price</span>
                            <span className="order-price">Quantity</span>

                        </div>
                {currentUserOrders.map(order => (
                    <section key={order.productName}>
                    <div className="user-cart">
                        <span className="productName">{order.productName}</span>
                        <span className="order-price">{order.price} USD</span>
                        <span className="productQnt">{order.giftQnt}</span>
                        <button type="submit" className="deleteChoosenGift" onClick={() => { this.deleteSingleGift(currentUser, order.productName) }}>Delete</button>
                    </div>
                </section>
                ))
                }
                <div className="user-sum">
                    <span className="totalSum">TotalSum:</span>
                    <span className="totalSumValue">{`${sum} USD`}</span>
                </div>
                <div className="cart-buttons">
                    <NavLink to="/" className="continue-shoping">Continue Shoping</NavLink>
                    <button to="/" onClick={() => { removeUserOrders(currentUser) }} type="submit" className="buy-product">Buy</button>
                </div>
              </Fragment>
                )
                : <div className="noCartPage">
                    <h2 className="noGifts">Sorry, you have no items in the cart. </h2>
                    <NavLink className="backBtn" to="/">Back to menu</NavLink>
                </div>
            }

            </Fragment>

        )
    }
}

export default Cart;