import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../../styles/style.css';

class Details extends Component {
    render() {

        let currentProduct = {};
        this.props.gifts.forEach(element => {
            if (element._id === this.props.match.params.id) {
                currentProduct = element;
                return;
            }
        });

        return (
            <div className="details">
                <h1>Details</h1>
                <div className="details-img">
                    <img src={currentProduct.imageUrl} />
                </div>
                <p className="product-description">{currentProduct.description}</p>
                <NavLink to="/" className="continue-shopping1">Back to menu</NavLink>
            </div>
        )
    }
}
export default Details;
