import React, { Component, Fragment } from 'react';
import '../styles/style.css';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            giftName: null,
            description: null,
            imageUrl: null,
            price: null
        }
        this.handleChange = props.handleChange.bind(this);
    }

    render() {
        return (
            <Fragment>
                <div className="create-gift">
                    <h1>Create Gift</h1>
                    <span>Gift name</span>
                    <form onSubmit={(e) => this.props.handleCreateSubmit(e, this.state)} >
                        <input type="text" onChange={this.handleChange} name="giftName" placeholder="Enter gift name" />
                        <span>Description</span>
                        <input type="text" onChange={this.handleChange} name="description" placeholder="Enter gift description" />
                        <span>Image Url</span>
                        <input type="text" onChange={this.handleChange} name="imageUrl" placeholder="Enter gift image URL" />
                        <span>Price</span>
                        <input type="text" onChange={this.handleChange} name="price" placeholder="Enter pizza price" />
                        <button>Create gift</button>
                    </form>
                </div>
            </Fragment>
        )
    }
}

export default Create;