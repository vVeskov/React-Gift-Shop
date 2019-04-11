import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import {  toast } from 'react-toastify';
import '../styles/style.css';

class Home extends Component {

    render() {

        function deleteGift(id) {
            let requestBody = {
                _id: id
            }
            fetch('http://localhost:9999/feed/gift/delete', {
                method: "DELETE",
                body: JSON.stringify(requestBody),
                headers: { 'Content-Type': 'application/json', }
            }).then(
                toast.success('Gift deleted successfully', {
                    closeButton: false,
                })
            );

            { window.location.href = 'http://localhost:3000'; }
        }

        return (
            <Fragment>
                <section className="main-description">
                    <h1>Welcome to our Gift Shop!</h1>
                    {/* <button className="gift-menu">Gift Menu</button> */}
                </section>
                <h2 className="top-rated">Best gifts ever</h2>
                <main>
                    <section>
                        {this.props.gifts.map(gift => (

                            <div className="single-gift" key={gift._id}>
                                <img src={gift.imageUrl} />
                                <span className="boldText">Product</span>
                                <span className="gift-name">{gift.giftName}</span>
                                {/* <span>Description</span>
                                <p className="gift-description">{gift.description}</p> */}
                                <div className="gift-details">
                                    <span className="boldText">Price</span>
                                    <span className="gift-price">{gift.price}</span>
                                    {
                                        this.props.isAdmin ?
                                            (
                                                <Fragment>
                                                    <NavLink to="/edit" className="editButton" to={`edit/${gift._id}`}>Edit</NavLink>
                                                    <button className="deleteButton" onClick={() => { deleteGift(`${gift._id}`) }} type="submit">Delete</button>
                                                </Fragment>
                                            )
                                            :
                                            <div className="userOrdDetailsBtns">
                                                <NavLink className="orderBtn1" to={`order/${gift._id}`}>Order</NavLink>
                                                <NavLink className="orderBtn" to={`details/${gift._id}`}>Details</NavLink>
                                            </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </section>
                </main>
                <footer>
                    <span>Gift Shop 2019</span>
                </footer>
            </Fragment>
        )
    }
}

export default Home;