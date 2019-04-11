import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/style.css';

class Register extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <nav className="navigation">
                        <h2>Gift Shop</h2>
                        <ul>
                            <li><NavLink exact to="/">Home</NavLink></li>
                            {this.props.isAdmin ?
                                (<li>
                                    <NavLink to="/create">Create</NavLink>
                                </li>)
                                : null}


                            {/* <li><NavLink to="#">Gifts</NavLink></li> */}
                            {/* <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contacts">Contacts</NavLink></li> */}
                            {
                                this.props.username ? (
                                    <Fragment>
                                        <li><NavLink to='/cart'>Cart</NavLink></li>
                                        <li><NavLink to="/" onClick={this.props.logout}>Logout</NavLink></li>
                                        <li className="logged-username">Welcome {this.props.username}!</li>
                                    </Fragment>
                                )
                                    :
                                    (<Fragment>
                                        <li><NavLink to="/register">Register</NavLink></li>
                                        <li><NavLink to="/login">Login</NavLink></li>
                                    </Fragment>)
                            }
                        </ul>
                    </nav>
                </header>
            </Fragment>
        )
    }
}

export default Register;