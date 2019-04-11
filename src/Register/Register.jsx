import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/style.css';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null
        }
        this.handleChange = props.handleChange.bind(this);
    }

    render() {
        if (this.props.isLogged) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <Fragment>
                <form onSubmit={(e) => this.props.handleSubmit(e, this.state, true)}>
                    <div className="register">
                        <h1>Register</h1>
                        <span className="reg-info">Create your account.It`s free and takes only a minute.</span>
                        <span>Username</span>
                        <input type="text" onChange={this.handleChange} name="username" placeholder="Enter username" />
                        <span>Email</span>
                        <input type="email" onChange={this.handleChange} name="email" placeholder="Enter e-mail" />
                        <span>Password</span>
                        <input type="password" onChange={this.handleChange} name="password" placeholder="Enter password" />
                        <button>Register</button>
                    </div>
                </form>
            </Fragment>
        )
    }
}

export default Register;