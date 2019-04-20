import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import '../../styles/style.css';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            giftName: '',
            description: '',
            imageUrl: '',
            price: ''
        }
        this.handleChange = props.handleChange.bind(this);
    }

    render() {
        let currentProduct = {};

        this.props.gifts.forEach(element => {
            if (element._id === this.props.match.params.id) {
                currentProduct = element;
                return;
            }
        });

        let editGift = (e, data) => {
            e.preventDefault();
            data._id = this.props.match.params.id;

            data.giftName = data.giftName ? data.giftName : currentProduct.giftName;
            data.description = data.description ? data.description : currentProduct.description;
            data.imageUrl = data.imageUrl ? data.imageUrl : currentProduct.imageUrl;
            data.price = data.price ? data.price : currentProduct.price;

            fetch('http://localhost:9999/feed/gift/edit', {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json', }

            })
                .then(responseBody => {
                    if (!responseBody.errors) {
                        toast.success("Gift edited successfully", {
                            closeButton: false,
                        })
                         { window.location.href = 'http://localhost:3000'; }
                    } else {
                        toast.error("Something went wrong", {
                            closeButton: false,
                        })
                    }
                })

        }

        return (
            <Fragment>
                <div className="edit-gift">
                    <form onSubmit={(e) => editGift(e, this.state)}>
                        <h1>Edit Gift</h1>
                        <span>Gift name</span>
                        <input type="text" onChange={this.handleChange} placeholder={`${currentProduct.giftName}`} readOnly={false} name="giftName" />
                        <span>Description</span>
                        <input type="text" onChange={this.handleChange} placeholder={`${currentProduct.description}`} name="description" />
                        <span>Image Url</span>
                        <input type="text" onChange={this.handleChange} placeholder={`${currentProduct.imageUrl}`} name="imageUrl" />
                        <span>Price</span>
                        <input type="text" onChange={this.handleChange} placeholder={`${currentProduct.price}`} name="price" />
                        <button >Edit gift</button>
                    </form>

                </div>
            </Fragment>

        )
    }
}

export default Edit;